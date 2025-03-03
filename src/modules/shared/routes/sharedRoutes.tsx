/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, lazy } from 'react'
import { RouteProps } from 'react-router-dom'
import { PATH } from './paths'
import MainLayout from '../layout/MainLayout/MainLayout'

type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

const routes: RouteConfig[] = [
  {
    exact: true,
    path: PATH.All,
    layout: MainLayout,
    component: lazy(async () => await import('../features/NotFound/NotFound')),
  },
]

export default routes
