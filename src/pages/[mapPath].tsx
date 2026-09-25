import type { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { isMobile } from "react-device-detect"
import { MapEditorProvider } from "../components/organisms/SVGMap/MapEditorContext"
import StudioCanvas from "../components/organisms/StudioShell/StudioCanvas"
import StudioHeader from "../components/organisms/StudioShell/StudioHeader"
import StudioToolbar from "../components/organisms/StudioShell/StudioToolbar"
import StudioControls from "../components/organisms/StudioInspector/StudioControls"
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

  useEffect(() => {
    dispatch(updateCurrentMap(currentMap))
  }, [currentMap, dispatch])

  useEffect(() => {
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
      <div className="studio-page">
        <StudioHeader currentMap={currentMap} />
        <main className="studio-workspace">
          <StudioToolbar />
          <div className="studio-workspace__content">
            <StudioCanvas currentMap={currentMap} />
            <StudioControls currentMap={currentMap} />
          </div>
        </main>
      </div>
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
