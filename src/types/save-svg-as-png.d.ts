declare module "save-svg-as-png" {
  interface SaveSvgAsPngOptions {
    encoderOptions?: number
    scale?: number
    backgroundColor?: string
    modifyCss?: () => string
  }

  export function saveSvgAsPng(
    svg: SVGSVGElement,
    filename: string,
    options?: SaveSvgAsPngOptions,
  ): Promise<void>
}
