import React from 'react'
import styled from '@emotion/styled'

import { Flex } from '@chakra-ui/react'

function Card({children, ...props}) {
  return (
    <Element 
      background='#fff'
      boxShadow='0px 18px 32px rgba(208, 210, 218, 0.15)'
      borderRadius='16px'
      {...props}>
      { children }
    </Element>
  )
}

Card.propTypes = {

}

const Element = styled(Flex)`
  position: relative;
`

export default Card
