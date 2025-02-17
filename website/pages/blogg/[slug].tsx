import { LayoutPicker, PreviewBanner } from "@/components";
import { AkselBlogg, akselBloggBySlug, akselEditorById } from "@/lib";
import { GetServerSideProps } from "next/types";
import React from "react";
import { getClient } from "@/sanity-client";

const Page = (props: {
  slug?: string;
  page: AkselBlogg;
  preview: boolean;
}): JSX.Element => {
  return (
    <>
      {props.preview && <PreviewBanner />}
      <LayoutPicker title="Aksel" data={props.page} />
    </>
  );
};

interface StaticProps {
  props: {
    page: AkselBlogg;
    slug: string;
    preview: boolean;
    validUser?: boolean;
  };
  notFound: boolean;
}

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<StaticProps | { notFound: true }> => {
  /* const isValidUser = await isValidated(context); */

  const page = await getClient(context.preview).fetch(akselBloggBySlug, {
    slug: `blogg/${context.params.slug}`,
    valid: "true" /* `${isValidUser}` */,
  });

  const doc = page?.[0] ?? null;

  const editors = doc
    ? await getClient(true).fetch(akselEditorById, {
        id: doc._id,
      })
    : [];

  return {
    props: {
      page: { ...doc, ...editors },
      slug: context.params.slug as string,
      preview: context.preview ?? null,
      /* validUser: isValidUser, */
    },
    notFound: !doc,
  };
};

export default Page;
