import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material"
import TextFieldsIcon from "@mui/icons-material/TextFields"
import BrushIcon from "@mui/icons-material/Brush"
import InfoIcon from "@mui/icons-material/Info"
import LayersIcon from "@mui/icons-material/Layers"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { updateModal } from "../../../redux/modalSlice"

const NavBar = () => {
  const dispatch = useDispatch()

  return (
    <Box>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          onChange={(event, newValue) => dispatch(updateModal(newValue))}
        >
          <BottomNavigationAction
            sx={{
              backgroundColor: "#102946",
              color: "#fff",
            }}
            label="Map Legend"
            value="map-legend"
            icon={<TextFieldsIcon />}
          />
          <BottomNavigationAction
            sx={{ backgroundColor: "#102946", color: "#fff" }}
            label="Color Picker"
            value="color-picker"
            icon={<BrushIcon />}
          />
          <BottomNavigationAction
            sx={{ backgroundColor: "#102946", color: "#fff" }}
            label="Actions"
            value="actions"
            icon={<LayersIcon />}
          />
          <BottomNavigationAction
            sx={{ backgroundColor: "#102946", color: "#fff" }}
            label="Tutorial"
            value="tutorial"
            icon={<InfoIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}

export default NavBar
