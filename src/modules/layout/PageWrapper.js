import React from 'react'

import { Flex } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'

function PageWrapper({children, ...rest}) {
  const theme = useTheme()
  return (
    <Flex
      position='relative'
      flexDirection='row'
      justifyContent='flex-start'
      alignItems='flex-start'
      h='100vh'
      w='100%'
      bg={theme.colors.background}
      {...rest}
    >
      { children }
    </Flex>
  )
}

PageWrapper.propTypes = {

}

export default PageWrapper

