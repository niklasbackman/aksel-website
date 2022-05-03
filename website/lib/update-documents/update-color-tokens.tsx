import css from "css";
import { readFileSync } from "fs";
import dotenv from "dotenv";
import { noCdnClient } from "../sanity/sanity.server";

dotenv.config();

type ColorEntryT = {
  title: string;
  color: string;
};

const parseDeclaration = (declaration): ColorEntryT => ({
  title: declaration.property.replace("navds-", ""),
  color: declaration.value,
});

const semantic = "semantic-color";
const global = "global-color";

const cssData = readFileSync(
  "../node_modules/@navikt/ds-tokens/dist/tokens.css"
);

const parsed = css.parse(cssData.toString());
const root = parsed.stylesheet.rules.find((r) =>
  r.selectors?.includes(":root")
);

const colors: ColorEntryT[] = root.declarations
  .filter((d) => d.property.includes(global) || d.property.includes(semantic))
  .map((d) => parseDeclaration(d));

const updateTokens = async () => {
  const token = process.env.SANITY_WRITE_KEY;
  // this is our transactional client, it won't push anything until we say .commit() later
  const transactionClient = noCdnClient(token).transaction();

  // first let's fetch the current state from sanity,
  // So that we can delete old/changed tokens
  const remoteTokens = await noCdnClient(token).fetch(
    `*[_type == "ds_color_tokens"]`
  );

  for (const token of remoteTokens) {
    if (
      !colors.find(
        (x) => token._id === `${x.title.replaceAll("-", "_")}_autogen_token`
      )
    )
      transactionClient.delete(token._id);
  }

  colors.forEach((c) =>
    transactionClient.createOrReplace({
      _id: `${c.title.replaceAll("-", "_")}_autogen_token`,
      _type: "ds_color_tokens",
      autogenerated: true,
      ...c,
    })
  );

  await transactionClient
    .commit()
    .then(() => console.log(`Updated color tokens`))
    .catch((e) => console.error(e.message));
};

updateTokens();
