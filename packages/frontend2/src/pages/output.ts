import fsx from 'fs-extra'
import path from 'path'
import { render } from 'preact-render-to-string'

import { Page } from './Page'

export function outputPages(pages: Page[]) {
  for (const { slug, page } of pages) {
    fsx.mkdirpSync(path.join('build', slug))
    const html = `<!DOCTYPE html>${render(page)}`
    fsx.writeFileSync(path.join('build', slug, 'index.html'), html)
  }
}
