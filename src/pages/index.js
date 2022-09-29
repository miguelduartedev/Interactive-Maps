import Head from "next/head";
import { Fragment } from "react";
import Hero from "../components/organisms/Hero/hero";
import OptionsGrid from "../components/organisms/OptionsGrid/OptionsGrid";
import Panel from "../components/organisms/Panel/panel";

const HomePage = () => {
  return (
    <Fragment>
      <Head>
        <title>Interactive Maps</title>
        <meta
          name="description"
          content="Create custom maps to showcase your data! Illustrate your data through a map of the World, Europe, North America, South America, Africa or Asia."
        />
      </Head>
      <Hero />
      <Panel />
      <OptionsGrid />
    </Fragment>
  );
};

/**
 * Reserved Name, Next.JS recognized this and will call this before calling the component function (HomePage)
 * Prepares props for this page, could contain the data this page needs
 * Is allowed to be asyncronous (async promise), so Next.JS will wait for the promise to resolve
 * Waits for data to be loaded and only afterwards does it load the component function (HomePage) (good for SEO -> source file is populated)
 *
 * Using getStaticProps could make data quickly outdated (not a problem since these pages don't change often)
 * If pages change regularly then use revalidade which configures the number of seconds until it re-generates the page for an incoming request
 * */
export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: 3600,
  };
};

export default HomePage;
