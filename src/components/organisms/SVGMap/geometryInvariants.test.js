import fs from "fs"
import path from "path"
import crypto from "crypto"
import baseline from "./geometry-baseline.json"

test.each(Object.keys(baseline))("%s retains every original SVG path attribute and coordinate", (name) => {
  const source = fs.readFileSync(path.join(__dirname, "maps", name + "SVG.js"), "utf8")
  const paths = source.match(/<path\b[\s\S]*?\/>/g)
  expect(paths).toHaveLength(baseline[name].count)
  expect(crypto.createHash("sha256").update(paths.join("\n")).digest("hex")).toBe(baseline[name].hash)
  expect(source).toContain(name === "World" ? 'viewBox="0 0 1300 684"' : 'viewBox="0 0 1000 684"')
})
