import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { useEthers } from "@usedapp/core"

function AdminLayout({ children }) {
  const { account } = useEthers()

  if(!account) {
    return <Redirect to='/login' />
  }

  return (
    <>
      { children }
    </>
  )
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default AdminLayout

