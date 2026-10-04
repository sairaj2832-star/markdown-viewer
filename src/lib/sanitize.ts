import DOMPurify from 'dompurify'

export function sanitizeSvg(svg: string): string {
  return DOMPurify.sanitize(svg, {
    USE_PROFILES: { svg: true, svgFilters: true },
    // foreignobject is in DOMPurify's FORBID_CONTENTS, so without these the element and
    // its label text are dropped and venn/c4/architecture-with-iconText render as empty
    // boxes. Treating it as an HTML integration point keeps the text and still drops the
    // HTML wrappers, so script, event handlers, forms and iframes inside it are removed.
    ADD_TAGS: ['foreignobject'],
    HTML_INTEGRATION_POINTS: { foreignobject: true },
  })
}
