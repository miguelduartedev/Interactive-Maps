import clsx from "clsx"
import type { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { isMobile } from "react-device-detect"
import Footer from "../components/atoms/Footer/footer"
import Navigation from "../components/atoms/Navigation/navigation"
import ControlPanel from "../components/organisms/ControlPanel/controlPanel"
import { MapEditorProvider } from "../components/organisms/SVGMap/MapEditorContext"
import SVGMap from "../components/organisms/SVGMap/svgMap"
import Modal from "../components/organisms/Modal/modal"
import Navbar from "../components/organisms/NavBar/navbar"
import { updateDevice } from "../redux/deviceSlice"
import { useAppDispatch } from "../redux/hooks"
import { updateCurrentMap } from "../redux/mapSlice"
import { isMapRoute, MAP_ROUTES, type MapRoute } from "../types/editor"

interface MapPathProps {
  initialMap: MapRoute
}

interface MapPathParams extends Record<string, string> {
  mapPath: string
}

export default function MapPath({ initialMap }: MapPathProps) {
  const router = useRouter()
  const currentMap = isMapRoute(router.query.mapPath) ? router.query.mapPath : initialMap
  const dispatch = useAppDispatch()
  const [isMobileReact, setIsMobileReact] = useState(false)

  useEffect(() => {
    dispatch(updateCurrentMap(currentMap))
  }, [currentMap, dispatch])

  useEffect(() => {
    setIsMobileReact(isMobile)
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

export const getStaticPaths: GetStaticPaths<MapPathParams> = async () => ({
  paths: MAP_ROUTES.map((mapPath) => ({ params: { mapPath } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<MapPathProps, MapPathParams> = async ({ params }) => {
  if (!isMapRoute(params?.mapPath)) return { notFound: true }
  return {
    props: { initialMap: params.mapPath },
    revalidate: 3600,
  }
}
