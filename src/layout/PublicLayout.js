import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { useEthers } from "@usedapp/core"

function PublicLayout({ children }) {
  const { account } = useEthers()
  console.log('account', account)
  if(account) {
    return <Redirect to='/' />
  }

  return (
    <>
      { children }
    </>
  )
}

PublicLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default PublicLayout

