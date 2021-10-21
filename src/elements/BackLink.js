import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { prop } from 'styled-tools'
import { Box } from '@chakra-ui/react'
import { ChevronLeft } from 'react-iconly'
import { useTheme } from '@emotion/react'

function BackLink({ children, ...props }) {
  const theme = useTheme()

  return (
    <Element>
      <ChevronLeft width='20px' height='20px' set="bold" primaryColor={theme.colors.primary}/> {children}
    </Element>
  )
}

const Element = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 15px;
  color: ${prop('theme.colors.primary')};
`

BackLink.propTypes = {

}

export default BackLink

