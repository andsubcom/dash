import React from 'react'
import styled from '@emotion/styled'

import { Flex } from '@chakra-ui/react'

function Card({children, ...props}) {
  return (
    <Element {...props}>
      { children }
    </Element>
  )
}

Card.propTypes = {

}

const Element = styled(Flex)`
  position: relative;
  background: #fff;
  box-shadow: 0px 18px 32px rgba(208, 210, 218, 0.15);
  border-radius: 24px;
`

export default Card
