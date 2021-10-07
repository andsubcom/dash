import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { useDisclosure, Flex, Button, Image } from '@chakra-ui/react'
import { ConnectButton, AccountModal } from 'modules/wallet'
import { Link } from 'react-router-dom'

function Header(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex 
      flexDirection='row'
      bg='#161624'
      justifyContent='space-between'
      width='100%'
      padding='20px'
      alignItems='center'>
      <Link to='/'>
        <Flex flexDirection='row' alignItems='center' ml='12px'>
          <Image
              marginLeft='6px'
              marginRight='12px'
              boxSize="42px"
              src="/logo.png"
            />
          <LogoText>Andsub</LogoText>
        </Flex>
      </Link>
      <Flex flexDirection='row'>
        {/* <Link to='/plans'>
          <Button mr='18px' colorScheme="pink" variant="solid">
            Get Premium
          </Button>
        </Link> */}
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Flex>
  )
}

const LogoText = styled.span`
  font-size: 21px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: .86px;
  color: #fff;
`

Header.propTypes = {

}

export default Header

