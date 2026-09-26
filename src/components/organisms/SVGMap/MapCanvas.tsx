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
import MapAnnotations from "../../atoms/MapAnnotations/mapAnnotations"
import {
  indexGeometry,
  type GeometryElementProps,
  type GeometryNode,
} from "./countryGeometry"
import { useMapEditor } from "./MapEditorContext"
import { useMapInteractions } from "./useMapInteractions"

export const DEFAULT_COUNTRY_FILL = "#D9E4EF"

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
    fill: color || DEFAULT_COUNTRY_FILL,
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
  const { canvas, tool, viewport } = useMapEditor()
  const isMobile = useAppSelector((state) => state.deviceState.isMobile)
  const geometry = useMemo(() => indexGeometry(children), [children])
  const available = useMemo(() => new Set(geometry.countries), [geometry.countries])
  const { handlers, hovered } = useMapInteractions(svgRef, available, tool, viewport)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const registration = { svg, countries: geometry.countries, currentMap }
    canvas.current = registration
    return () => {
      if (canvas.current === registration) canvas.current = null
    }
  }, [canvas, currentMap, geometry.countries])

  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      {...svgProps}
      {...handlers}
      id={currentMap}
      ref={svgRef}
      className={clsx(
        "interactive-map",
        `interactive-map--${tool}`,
        isMobile && "-mobile-version",
      )}
    >
      <Geometry tree={geometry.tree} hovered={hovered} currentMap={currentMap} />
      <MapAnnotations currentMap={currentMap} />
    </svg>
  )
}
