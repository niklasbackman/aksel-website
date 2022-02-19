import {
  BodyLong,
  BodyShort,
  Detail,
  Heading,
  Label,
  Link,
  Tag,
} from "@navikt/ds-react";
import NextLink from "next/link";
import React from "react";
import {
  PropTable as PropTableT,
  PropTableProp as PropTablePropT,
} from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";
import { InlineCode } from "../../SanityBlockContent";

const PropTable = ({ node }: { node: PropTableT }): JSX.Element => {
  const Table = ({ prop }: { prop: PropTablePropT }) => (
    <table className="mb-0 border-separate border-t border-t-divider pt-5 first-of-type:mt-4 last-of-type:mb-12 last-of-type:border-b last-of-type:border-b-divider">
      <caption className="m-0 mb-2 flex flex-col text-left">
        {prop.required && (
          <Detail className="text-feedback-danger-text">Required</Detail>
        )}
        <Tag
          variant="info"
          size="small"
          className="border-none bg-deepblue-50 font-mono text-deepblue-500"
        >
          {prop.name}
        </Tag>
      </caption>
      <tbody className="border-none">
        <tr>
          <Label
            as="th"
            size="small"
            className="min-w-[100px] pr-4 pb-3 pl-[0.125rem] text-left"
          >
            Type
          </Label>
          <BodyShort as="td" className="w-full pb-2 pl-1">
            <pre style={{ margin: 0 }}>
              <code className="text-medium text-lightblue-800">
                {prop.type}
              </code>
            </pre>
          </BodyShort>
        </tr>
        {prop.description && (
          <tr>
            <Label
              as="th"
              size="small"
              className="pr-4 pb-3 pl-[0.125rem] text-left"
            >
              Description
            </Label>
            <BodyShort as="td" className="w-full pb-2 pl-1">
              {prop.description}
            </BodyShort>
          </tr>
        )}
        {prop.default && (
          <tr>
            <Label
              as="th"
              size="small"
              className="min-w-[100px] pr-4 pb-3 pl-[0.125rem] text-left"
            >
              Default
            </Label>
            <BodyShort as="td" className="w-full pb-2 pl-1">
              {prop.default ? (
                <code className="text-medium text-lightblue-800">
                  {prop.default}
                </code>
              ) : (
                <span>-</span>
              )}
            </BodyShort>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <details className="index-ignore">
      {node.title ? (
        <Heading
          size="small"
          as="summary"
          className="mb-2 cursor-pointer p-2 hover:bg-interaction-primary-hover-subtle focus:shadow-focus focus:outline-none"
        >
          {node.title}
        </Heading>
      ) : (
        <summary>Props</summary>
      )}

      <div className="relative mb-8 mt-4 overflow-x-auto">
        <BodyLong as="ul" className="mb-8">
          {node.overridable && (
            <li>
              Komponenten er implementert med{" "}
              <NextLink href="/designsystem/side/overridablecomponent" passHref>
                <Link>OverridableComponent</Link>
              </NextLink>
            </li>
          )}
          {node.extends && (
            <li>
              Props extender <InlineCode>{node.extends}</InlineCode>
            </li>
          )}
        </BodyLong>

        {node.preset_children && (
          <Table
            prop={{
              _type: "prop_table_prop",
              name: "children",
              type: "React.ReactNode",
              required: true,
            }}
          />
        )}
        {node.preset_classname && (
          <Table
            prop={{
              _type: "prop_table_prop",
              name: "className",
              type: "string",
              required: false,
              description:
                "Legger til egne klassenavn på elementet Props ekstender",
            }}
          />
        )}

        {node?.props?.map((prop: PropTablePropT) => (
          <Table key={prop.name} prop={prop} />
        ))}
      </div>
    </details>
  );
};

export default withErrorBoundary(PropTable, "Proptable");
