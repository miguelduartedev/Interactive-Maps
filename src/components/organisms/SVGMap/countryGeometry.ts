import {
  Children,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type SVGProps,
} from "react"
import type { CountryId } from "../../../types/editor"

const countryCode = /^[A-Z]{2}$/
const excluded = new Set(["defs", "clipPath", "mask", "pattern", "symbol"])

export interface GeometryElementProps extends SVGProps<SVGElement> {
  children?: ReactNode
  "data-country"?: CountryId
}

export interface GeometryNode {
  element: ReactNode
  country?: CountryId
  children?: GeometryNode[] | null
}

export interface IndexedGeometry {
  tree: GeometryNode[]
  countries: CountryId[]
}

export function countryFromElement(element: ReactElement<GeometryElementProps>): CountryId | null {
  if (element.type !== "path") return null
  const { id, className } = element.props
  if (countryCode.test(id ?? "")) return id ?? null
  return (className ?? "").split(/\s+/).find((token) => countryCode.test(token)) ?? null
}

// Index only the literal geographic tree. Do not inspect component output (e.g. legends).
export function indexGeometry(children: ReactNode): IndexedGeometry {
  const countries = new Set<CountryId>()

  function visit(nodes: ReactNode): GeometryNode[] {
    return Children.toArray(nodes).map((element) => {
      if (!isValidElement<GeometryElementProps>(element)) return { element }
      if (typeof element.type === "string" && excluded.has(element.type)) return { element }

      const country = countryFromElement(element)
      if (country) countries.add(country)
      const canContainGeometry = typeof element.type === "string" || element.type === Fragment

      return {
        element,
        country: country ?? undefined,
        children: !country && element.props.children && canContainGeometry
          ? visit(element.props.children)
          : null,
      }
    })
  }

  return { tree: visit(children), countries: [...countries] }
}

export function countryFromTarget(
  target: EventTarget | null,
  svg: SVGSVGElement | null,
  available: ReadonlySet<CountryId>,
): CountryId | null {
  if (!(target instanceof Element)) return null
  const element = target.closest("[data-country]")
  if (!element || !svg?.contains(element)) return null
  const country = element.getAttribute("data-country")
  return country && available.has(country) ? country : null
}
