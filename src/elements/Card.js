import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { Flex } from '@chakra-ui/react'

function Card({children, ...props}) {
  return (
    <Element
      width='340px'
      height='425px'
    >
      { children }
    </Element>
  )
}

Card.propTypes = {

}

const Element = styled(Flex)`
  position: relative;
  background: rgb(13, 14, 8);
  box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  border-radius: 24px;
  border: 1px solid rgb(25, 28, 34);
`

export default Card
