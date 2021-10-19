import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { Flex } from '@chakra-ui/react'

function StatsCard({title, stat, ...props}) {
  return (
    <Element bg="#ececef" {...props}>
      <Title>{title}</Title>
      <Stat>{stat}</Stat>
    </Element>
  )
}

const Stat = styled.div`
  display: flex;
  color: #081343;
  font-size: 32px;
  line-height: 48px;
`

const Title = styled.div`
  display: flex;
  color: #081343;
  opacity: 0.4;
  font-size: 16px;
  line-height: 24px;
`

const Element = styled(Flex)`
  width: 240px;
  height: 160px;
  padding: 16px 24px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  border: 4px solid #FFFFFF;
  box-sizing: border-box;
  box-shadow: 0px 0px 24px 8px rgba(0, 0, 0, 0.02);
  border-radius: 24px;
`

StatsCard.propTypes = {

}

export default StatsCard

