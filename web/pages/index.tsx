/* Frontpage */

import FrontPage from "../components/frontpage/FrontPage";
import { fetchFrontpage, SanityFrontpage } from "../sanity-types";

const Page = (props) => <FrontPage {...props} />;

interface StaticProps {
  props: {
    frontpage: SanityFrontpage;
  };
  revalidate: number;
}

export const getStaticProps = async (): Promise<StaticProps> => {
  const frontpage = await fetchFrontpage();
  return {
    props: { frontpage },
    revalidate: 60,
  };
};

export default Page;
