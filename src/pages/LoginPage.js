import React from 'react'
import { Flex, Image } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { PageWrapper} from 'modules/layout'
import { ConnectButton } from 'modules/wallet'

function LoginPage(props) {
  return (
    <PageWrapper
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        mt={-182}
      >
        <Flex flexDirection='row' alignItems='center' justifyContent='center' ml='-12px' mt='38px' mb='62px'>
          <Image
              marginLeft='6px'
              marginRight='18px'
              boxSize="68px"
              src="/logo.png"
            />
          <LogoText>Andsub</LogoText>
        </Flex>
        <ConnectButton buttonOnly handleOpenModal={() => {}} />
      </Flex>
    </PageWrapper>
  )
}

const LogoText = styled.span`
  font-size: 42px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: .86px;
  color: #000;
`

LoginPage.propTypes = {

}

export default LoginPage
