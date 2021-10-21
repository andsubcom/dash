import React, { Children } from 'react'
import PropTypes from 'prop-types'

import styled from '@emotion/styled'
import { prop } from 'styled-tools'

import { Flex } from '@chakra-ui/react'

function PageContainer({children, ...props}) {
  return (
    <Element {...props}>
      {children}
    </Element>
  )
}

const Element = styled(Flex)`
  background: ${prop('theme.colors.background')};
  padding: 40px 60px;
  width: calc(100% - 260px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

PageContainer.propTypes = {

}

export default PageContainer

