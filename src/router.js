import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import PublicLayout from 'layout/PublicLayout'
import AdminLayout from 'layout/AdminLayout'

import ProductPage from 'pages/ProductPage'
import ProductCreatePage from 'pages/ProductCreatePage'
import DashboardPage from 'pages/DashboardPage'
import LoginPage from 'pages/LoginPage'

const PublicRoute = ({ component: Component, layout: Layout, path, ...rest }) => {
  const render = props => {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    )
  }

  return (
    <Route path={path} render={render} {...rest} />
  )
}

const Routes = () => {
  return (
    <Switch>
      <PublicRoute exact path={'/'} component={ProductPage} layout={AdminLayout} />
      <PublicRoute exact path={'/product/create'} component={ProductCreatePage} layout={AdminLayout} />
      <PublicRoute exact path={'/dashboard'} component={DashboardPage} layout={AdminLayout} />
      <PublicRoute path={'/login'} component={LoginPage} layout={PublicLayout} />
      {/* <PublicRoute component={Error404Page} {...unauthRouteProps} /> */}
    </Switch>
  )
}

export default withRouter(Routes)
