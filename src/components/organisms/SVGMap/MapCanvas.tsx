import {
  cloneElement,
  isValidElement,
  memo,
  useEffect,
  useMemo,
  useRef,
  type ReactElement,
  type ReactNode,
  type SVGProps,
} from "react"
import clsx from "clsx"
import { useAppSelector } from "../../../redux/hooks"
import type { CountryId, MapRoute } from "../../../types/editor"
import MapLegend from "../../atoms/MapLegend/mapLegend"
import {
  indexGeometry,
  type GeometryElementProps,
  type GeometryNode,
} from "./countryGeometry"
import { useMapEditor } from "./MapEditorContext"
import { useMapInteractions } from "./useMapInteractions"

interface CountryShapeProps {
  element: ReactElement<GeometryElementProps>
  country: CountryId
  hovered: boolean
  currentMap: MapRoute
}

const CountryShape = memo(function CountryShape({
  element,
  country,
  hovered,
  currentMap,
}: CountryShapeProps) {
  const color = useAppSelector((state) => state.mapState.currentMap === currentMap
    ? state.mapState.countryColors[country]
    : undefined)

  return cloneElement(element, {
    fill: color || element.props.fill || "#FFFFFF",
    "data-country": country,
    className: clsx(element.props.className, hovered && "hovered-country"),
  })
})

interface GeometryProps {
  tree: GeometryNode[]
  hovered: CountryId | null
  currentMap: MapRoute
}

const Geometry = memo(function Geometry({ tree, hovered, currentMap }: GeometryProps) {
  return tree.map(({ element, country, children }, index) => {
    if (country && isValidElement<GeometryElementProps>(element)) {
      return (
        <CountryShape
          key={index}
          element={element}
          country={country}
          hovered={country === hovered}
          currentMap={currentMap}
        />
      )
    }
    if (children && isValidElement<GeometryElementProps>(element)) {
      return cloneElement(
        element,
        undefined,
        <Geometry tree={children} hovered={hovered} currentMap={currentMap} />,
      )
    }
    return element
  })
})

interface MapCanvasProps extends SVGProps<SVGSVGElement> {
  currentMap: MapRoute
  children: ReactNode
}

export default function MapCanvas({ currentMap, children, ...svgProps }: MapCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const editor = useMapEditor()
  const isMobile = useAppSelector((state) => state.deviceState.isMobile)
  const geometry = useMemo(() => indexGeometry(children), [children])
  const available = useMemo(() => new Set(geometry.countries), [geometry.countries])
  const { handlers, hovered } = useMapInteractions(svgRef, available)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const registration = { svg, countries: geometry.countries, currentMap }
    editor.canvas.current = registration
    return () => {
      if (editor.canvas.current === registration) editor.canvas.current = null
    }
  }, [currentMap, editor, geometry.countries])

  return (
    <svg
      {...svgProps}
      {...handlers}
      id={currentMap}
      ref={svgRef}
      className={clsx("interactive-map", isMobile && "-mobile-version")}
    >
      <MapLegend currentMap={currentMap} />
      <Geometry tree={geometry.tree} hovered={hovered} currentMap={currentMap} />
    </svg>
  )
}
