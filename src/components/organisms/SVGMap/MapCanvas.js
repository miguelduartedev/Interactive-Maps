import { cloneElement, memo, useEffect, useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import clsx from "clsx"
import MapLegend from "../../atoms/MapLegend/mapLegend"
import { indexGeometry } from "./countryGeometry"
import { useMapInteractions } from "./useMapInteractions"
import { useMapEditor } from "./MapEditorContext"

const CountryShape = memo(function CountryShape({ element, country, hovered, currentMap }) {
  const color = useSelector((state) => state.mapState.currentMap === currentMap
    ? state.mapState.countryColors[country] : undefined)
  return cloneElement(element, {
    fill: color || element.props.fill || "#FFFFFF",
    "data-country": country,
    className: clsx(element.props.className, hovered && "hovered-country"),
  })
})

const Geometry = memo(function Geometry({ tree, hovered, currentMap }) {
  return tree.map(({ element, country, children }, index) => {
    if (country) return <CountryShape key={index} element={element} country={country} hovered={country === hovered} currentMap={currentMap} />
    if (children) return cloneElement(element, {}, <Geometry tree={children} hovered={hovered} currentMap={currentMap} />)
    return element
  })
})

export default function MapCanvas({ currentMap, children, ...svgProps }) {
  const svgRef = useRef(null)
  const editor = useMapEditor()
  const isMobile = useSelector((state) => state.deviceState.isMobile)
  const geometry = useMemo(() => indexGeometry(children), [children])
  const available = useMemo(() => new Set(geometry.countries), [geometry])
  const { handlers, hovered } = useMapInteractions(svgRef, available)

  useEffect(() => {
    const registration = { svg: svgRef.current, countries: geometry.countries, currentMap }
    editor.canvas.current = registration
    return () => {
      if (editor.canvas.current === registration) editor.canvas.current = null
    }
  }, [currentMap, editor, geometry])

  return (
    <svg {...svgProps} id={currentMap} ref={svgRef}
      className={clsx("interactive-map", isMobile && "-mobile-version")} {...handlers}>
      <MapLegend currentMap={currentMap} />
      <Geometry tree={geometry.tree} hovered={hovered} currentMap={currentMap} />
    </svg>
  )
}
