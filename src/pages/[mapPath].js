import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import Footer from "../components/atoms/Footer/footer"
import Navigation from "../components/atoms/Navigation/navigation"
import ControlPanel from "../components/organisms/ControlPanel/controlPanel"
import SVGMap from "../components/organisms/SVGMap/svgMap"
import { updateCurrentMap } from "../redux/mapSlice"
import clsx from "clsx"
import { isMobile } from "react-device-detect"
import Modal from "../components/organisms/Modal/modal"
import Navbar from "../components/organisms/NavBar/navbar"
import { updateDevice } from "../redux/deviceSlice"
import { MapEditorProvider } from "../components/organisms/SVGMap/MapEditorContext"

const MapPath = ({ initialMap }) => {
  const router = useRouter()
  const currentMap = router.query.mapPath ?? initialMap
  const dispatch = useDispatch()

  const [isMobileReact, setisMobileReact] = useState(false)

  useEffect(() => {
    if (typeof currentMap === "string") {
      dispatch(updateCurrentMap(currentMap))
    }
  }, [currentMap, dispatch])

  useEffect(() => {
    setisMobileReact(isMobile)
    dispatch(updateDevice(isMobile))
  }, [dispatch])

  return (
    <MapEditorProvider key={currentMap}>
      <Head>
        <title>Interactive Maps: Map Creation Area</title>
        <meta
          name="description"
          content="Create custom maps to showcase your data! Illustrate your data through a map of the World, Europe, North America, South America, Africa or Asia."
        />
      </Head>
      <Modal />
      <div className="main">
        <Navigation />
        <div className={clsx(!isMobileReact && "container pt-5")}>
          <div className="row">
            <SVGMap initialMap={initialMap} />
            {!isMobileReact && <ControlPanel />}
          </div>
        </div>
        {isMobileReact && <Navbar />}
      </div>

      {!isMobileReact && <Footer />}
    </MapEditorProvider>
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

export const getStaticProps = async ({ params }) => {
  return {
    props: { initialMap: params.mapPath },
    revalidate: 3600,
  }
}

export default MapPath
