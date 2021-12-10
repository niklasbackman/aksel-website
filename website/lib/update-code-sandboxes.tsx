import { noCdnClient } from ".";
import { SandboxKeys } from "../sandbox";
import dotenv from "dotenv";
dotenv.config();

const main = async () => {
  const token = process.env.SANITY_WRITE_KEY;
  const transactionClient = noCdnClient(token).transaction();

  const docs = await noCdnClient(token).fetch(`*[_type == "ds_code_sandbox"]`);

  for (const doc of docs) {
    if (!SandboxKeys.includes(doc._id.replace("_autogen_sandbox", ""))) {
      transactionClient.delete(doc._id);
    }
  }

  for (const key of SandboxKeys) {
    transactionClient.createIfNotExists({
      _id: `${key}_autogen_sandbox`,
      _type: "ds_code_sandbox",
      title: key,
      autogenerated: true,
    });
  }
  await transactionClient
    .commit()
    .then(() => console.log(`Updated code-sandboxes`))
    .catch((e) => console.error(e.message));
};

main();
