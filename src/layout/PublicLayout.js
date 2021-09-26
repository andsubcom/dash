import React from 'react'
import PropTypes from 'prop-types'

function PublicLayout({ children }) {
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

