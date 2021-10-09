import React from 'react'

import { Flex } from '@chakra-ui/react'

function PageWrapper({children, ...rest}) {
  return (
    <Flex
      position='relative'
      flexDirection='row'
      justifyContent='flex-start'
      alignItems='flex-start'
      h='100vh'
      w='100%'
      bg='#f8f9fc'
      {...rest}
      >
      { children }
    </Flex>
  )
}

PageWrapper.propTypes = {

}

export default PageWrapper

