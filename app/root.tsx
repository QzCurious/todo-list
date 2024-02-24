import { LinksFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import favicon16 from './assets/img/favicon-16x16.png'
import favicon32 from './assets/img/favicon-32x32.png'
import tailwind from './tailwind.css?url'

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
  },
  {
    rel: 'stylesheet',
    href: tailwind,
  },
  { rel: 'icon', href: favicon32, type: 'image/png', sizes: '32x32' },
  { rel: 'icon', href: favicon16, type: 'image/png', sizes: '16x16' },
]

export const meta: MetaFunction = () => {
  return [
    { title: 'Simple Todo List' },
    {
      name: 'description',
      content: 'Todo List with Remix, Design by 黃奇昌',
    },
  ]
}

export default function App() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function HydrateFallback() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        {/* <p>Loading...</p> */}
        <Scripts />
      </body>
    </html>
  )
}
