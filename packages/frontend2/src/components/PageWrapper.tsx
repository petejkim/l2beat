import classNames from 'classnames'

import { ComponentChildren } from 'preact'

export interface PageWrapperProps {
  htmlClassName?: string
  children: ComponentChildren
}

export function PageWrapper(props: PageWrapperProps) {
  return (
    <html
      lang="en"
      className={classNames(
        'scroll-pt-16 scroll-smooth md:scroll-pt-8',
        props.htmlClassName,
      )}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body className="bg-white text-black dark:bg-black dark:text-white">
        {props.children}
        <script src="/script.js" />
      </body>
    </html>
  )
}
