import React from 'react'
import styled from '@emotion/styled'
import { ifProp } from 'styled-tools'

import { Document, Wallet} from 'react-iconly'

import { Flex, Image } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'

function Header(props) {
  const location = useLocation()

  return (
    <Flex 
      flexDirection='column'
      bg='#fff'
      width='280px'
      height='100%'>
      <Link to='/'>
        <Flex flexDirection='row' alignItems='center' justifyContent='center' ml='-12px' mt='48px' mb='55px'>
          <Image
            marginLeft='6px'
            marginRight='12px'
            width="140px"
            heigh="40px"
            src="/logo-text-black.png"
          />
        </Flex>
      </Link>
      <MenuList>
        <MenuItem to='/dashboard' active={location.pathname === '/dashboard'}> 
          <Flex marginRight='12px'> <Wallet set="bold" primaryColor={location.pathname === '/dashboard' ? '#3850fe' : '#a8aab2'}/></Flex> Dashboard
        </MenuItem>
        <MenuItem to='/' active={['/', '/product/create'].includes(location.pathname)}> 
          <Flex marginRight='12px'> <Document set="bold" primaryColor={['/', '/product/create'].includes(location.pathname) ? '#3850fe' : '#a8aab2'}/></Flex> Products
        </MenuItem>
      </MenuList>
    </Flex>
  )
}

const LogoText = styled.span`
  font-size: 21px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: .86px;
  color: #000;
`

const MenuList = styled(Flex)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MenuItem = styled(Link)`
  display: flex;
  width: 280px;
  font-size: 19px;
  line-height: 23px;
  letter-spacing: -0.02em;
  color: ${ifProp('active', '#3850fe', '#a8aab2')};
  padding: 24px 32px;
  margin-bottom: 18px;
  background: ${ifProp('active', '#eaecfc', 'transparent')};
`

Header.propTypes = {

}

export default Header

