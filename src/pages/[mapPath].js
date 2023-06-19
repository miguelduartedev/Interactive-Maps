import Head from "next/head"
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import Footer from "../components/atoms/Footer/footer"
import Navigation from "../components/atoms/Navigation/navigation"
import ControlPanel from "../components/organisms/ControlPanel/controlPanel"
import SVGMap from "../components/organisms/SVGMap/svgMap"
import { updateCurrentMap } from "../redux/mapSlice"
import clsx from "clsx"
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  Typography,
} from "@mui/material"
import TextFieldsIcon from "@mui/icons-material/TextFields"
import BrushIcon from "@mui/icons-material/Brush"
import InfoIcon from "@mui/icons-material/Info"
import LayersIcon from "@mui/icons-material/Layers"
import { BrowserView, isDesktop, isMobile } from "react-device-detect"
import { exists } from "../components/_common"
import Modal from "../components/organisms/Modal/modal"
import Navbar from "../components/organisms/NavBar/navbar"
import { updateDevice } from "../redux/deviceSlice"

const mapPath = () => {
  const router = useRouter()
  const currentMap = router.query.mapPath
  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState("")
  const [isMobileReact, setisMobileReact] = useState(false)

  dispatch(updateCurrentMap(currentMap))

  useEffect(() => {
    setisMobileReact(isMobile)
    dispatch(updateDevice(isMobile))
  }, [, isMobile])

  return (
    <Fragment>
      <Head>
        <title>Interactive Maps: Map Creation Area</title>
        <meta
          name="description"
          content="Create custom maps to showcase your data! Illustrate your data through a map of the World, Europe, North America, South America, Africa or Asia."
        />
      </Head>
      <Modal modalType={modalType} setModalType={setModalType} />
      <div className="main">
        <Navigation />
        <div className={clsx(!isMobileReact && "container pt-5")}>
          <div className="row">
            <SVGMap />
            {!isMobile && <ControlPanel />}
          </div>
        </div>
        {isMobile && <Navbar />}
      </div>

      <BrowserView>
        <Footer />
      </BrowserView>
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
