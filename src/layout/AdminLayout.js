import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { useEthers } from "@usedapp/core"

function ADminLayout({ children }) {
  const { account } = useEthers()
  console.log('account', account)
  if(!account) {
    return <Redirect to='/login' />
  }

  return (
    <>
      { children }
    </>
  )
}

ADminLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default ADminLayout

