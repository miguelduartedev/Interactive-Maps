import { Children, isValidElement } from "react"

const countryCode = /^[A-Z]{2}$/
const excluded = new Set(["defs", "clipPath", "mask", "pattern", "symbol"])

export function countryFromElement(element) {
  if (element.type !== "path") return null
  const { id, className } = element.props
  if (countryCode.test(id || "")) return id
  return (className || "").split(/\s+/).find((token) => countryCode.test(token)) || null
}

// Index only the literal geographic tree. Do not inspect component output (e.g. legends).
export function indexGeometry(children) {
  const countries = new Set()
  function visit(nodes) {
    return Children.toArray(nodes).map((element) => {
      if (!isValidElement(element) || excluded.has(element.type)) return { element }
      const country = countryFromElement(element)
      if (country) countries.add(country)
      return {
        element, country,
        children: !country && element.props.children && (typeof element.type === "string" || typeof element.type === "symbol")
          ? visit(element.props.children) : null,
      }
    })
  }
  const tree = visit(children)
  return { tree, countries: [...countries] }
}

export function countryFromTarget(target, svg, available) {
  const element = target?.closest?.("[data-country]")
  if (!element || !svg?.contains(element)) return null
  const country = element.getAttribute("data-country")
  return available.has(country) ? country : null
}
