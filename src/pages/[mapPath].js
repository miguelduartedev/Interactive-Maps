import Navigation from "components/atoms/Navigation/navigation";
import Head from "next/head";
import { Fragment } from "react";
import Footer from "../components/atoms/Footer/footer";
import ControlPanel from "../components/organisms/ControlPanel/controlPanel";
import SVGMap from "../components/organisms/SVGMap/svgMap";

const mapPath = ({ mapPath }) => {
  return (
    <Fragment>
      <Head>
        <title>Interactive Maps: Map Creation Area</title>
        <meta
          name="description"
          content="Create custom maps to showcase your data! Illustrate your data through a map of the World, Europe, North America, South America, Africa or Asia."
        />
      </Head>
      <div className="main">
        <Navigation />
        <div className="container pt-5">
          <div className="row">
            <SVGMap />
            <ControlPanel />
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};

// If the file was named [...mapPath] getStaticPaths would require mapPath to be an array

export async function getStaticPaths() {
  return {
    paths: [
      { params: { mapPath: "europe" } },
      { params: { mapPath: "world" } },
      { params: { mapPath: "africa" } },
      { params: { mapPath: "asia" } },
      { params: { mapPath: "north-america" } },
      { params: { mapPath: "south-america" } },
    ],
    fallback: false,
  };
}

export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: 3600,
  };
};

export default mapPath;
