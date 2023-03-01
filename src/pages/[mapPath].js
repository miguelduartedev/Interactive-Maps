import Head from "next/head"
import { useRouter } from "next/router"
import { Fragment } from "react"
import { useDispatch } from "react-redux"
import Footer from "../components/atoms/Footer/footer"
import Navigation from "../components/atoms/Navigation/navigation"
import ControlPanel from "../components/organisms/ControlPanel/controlPanel"
import SVGMap from "../components/organisms/SVGMap/svgMap"
import { updateCurrentMap } from "../redux/mapSlice"

const mapPath = () => {
  const router = useRouter()
  const currentMap = router.query.mapPath
  const dispatch = useDispatch()

  dispatch(updateCurrentMap(currentMap))

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
  )
}

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
  }
}

export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: 3600,
  }
}

export default mapPath
