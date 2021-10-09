import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import NetworkPage from 'pages/NetworkPage'

import { useEthers } from "@usedapp/core"

function AdminLayout({ children }) {
  const { account, chainId } = useEthers()

  if(!account) {
    return <Redirect to='/login' />
  }

  if (chainId !== 3) {
    return <NetworkPage />
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

