import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import PublicLayout from 'layout/PublicLayout'

import AdminPage from 'pages/AdminPage'

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

const Routes = ({
}) => {
  return (
    <Switch>
      <PublicRoute exact path={'/'} component={AdminPage} layout={PublicLayout} />
      {/* <PublicRoute component={Error404Page} {...unauthRouteProps} /> */}
    </Switch>
  )
}

export default withRouter(Routes)
