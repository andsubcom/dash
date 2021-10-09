import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { prop } from 'styled-tools'

import { useDisclosure, Flex, Text } from '@chakra-ui/react'
import { ConnectButton, AccountModal } from 'modules/wallet'

function PageHeader({ title, subtitle, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex 
      flexDirection='row'
      justifyContent='space-between'
      width='100%'
      alignItems='center'
      {...props}>
      <Flex flexDirection='column'>
        <PageTitle>{ title }</PageTitle>
        <PageSubtitle>{ subtitle }</PageSubtitle>
      </Flex>
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

const PageTitle = styled(Text)`
  font-weight: 600;
  font-size: 40px;
  line-height: 47px;
  letter-spacing: -0.02em;
  color: ${prop('theme.colors.font.primary')};
`

const PageSubtitle = styled(Text)`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: ${prop('theme.colors.font.secondary')};
  margin-top: 6px;
  margin-left: 1px;
`

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}

export default PageHeader

