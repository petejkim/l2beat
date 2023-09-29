import { Home } from './Home'
import { NotFound } from './NotFound'
import { Page } from './Page'
import { outputPages } from './output'

export async function renderPages() {
  const pages: Page[] = []

  pages.push({ slug: '/', page: Home() })
  pages.push({ slug: '/404', page: NotFound() })

  outputPages(pages)
}
