import React, { useState, useEffect } from 'react'
import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import { Loader } from 'elements'
import { prop } from 'styled-tools'
import toast from 'react-hot-toast'

import { useRenewProductSubscriptions } from 'modules/subscription'

export default function WithdrawModal({ isOpen, onClose, product }) {
  const [isMining, setIsMining] = useState(true)
  const { state, send } = useRenewProductSubscriptions()

  const handleWithdraw = () => {
    send(product.id)
  }

  useEffect(() => {
    switch (state.status) {
      case 'Mining':
        if(!isMining) { toast.success('Transaction has been sent') }
        setIsMining(true)
        break
      case 'Success':
        if(isMining) { toast.success('Successfully withdraw money') }
        setIsMining(false)
        onClose()
        break
      case 'Exception':
        toast.error(state.errorMessage)
        setIsMining(false)
        break
      default:
        setIsMining(false)
        break
    }
  }, [state])

  const renderButton = () => {
    if(isMining) {
      return (<Button
        key="0"
        disabled
        onClick={handleWithdraw}
        padding='0px 32px'
        colorScheme='main'
        borderRadius='40px'
        textTransform='uppercase'
        fontSize='14px'
        fontWeight='500'
        size="md"
      >
      <Loader width={5} height={5} mr={2} /> Withdraw
    </Button>)
    } else {
      return (<Button
        key="0"
        onClick={handleWithdraw}
        padding='0px 32px'
        colorScheme='main'
        borderRadius='40px'
        textTransform='uppercase'
        fontSize='14px'
        fontWeight='500'
        size="md"
      >
      Withdraw
    </Button>)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='lg'>
      <ModalOverlay />
      <ModalContent
        background='#f8f9fc'
        border='1px'
        borderStyle='solid'
        borderColor='whiteAlpha.700'
        borderRadius='4px'
      >
        <ModalHeader px={5} fontSize='xl' fontWeight='600'>
          Create Subscription
        </ModalHeader>
        <ModalCloseButton
          color='black.900'
          fontSize='sm'
          _hover={{
            color: 'black.700',
          }}
        />
        <ModalBody pt={0} px={0}>
          <Flex
            flexDirection="column"
            alignItems="start"
            justifyContent="start"
            style={{ userSelect: "none" }}
            w={{ base: "100%"}}
          >
            <Description>Short explanation to user on how subscriptions work and why user needs to withdraw money</Description>
            {/* <Flex p='4px 0px 8px 0px'><Text>Amount available: </Text><Bold ml={'6px'}> 324 USDX</Bold></Flex> */}
            <Flex
              justifyContent='space-between'
              alignItems='center'
              width='100%'
              padding='18px 28px 10px 20px'
              >
              <Flex
                w='100%'
                flexDirection='column'
                justifyContent='flex-start'
                alignItems='flex-start'
                >
                <Label mt='0px'>Available Amount</Label>
                <Flex flexDirection='row' alignItems='flex-end'>
                  <Price
                    fontSize='32px'>
                      324.54
                  </Price>
                  <Token ml='4px' mb='6px'>USDX</Token>            
                </Flex>
              </Flex>
              {renderButton()}
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const Description = styled(Text)`
  color: ${prop('theme.colors.font.secondary')};
  font-size: 15px;
  /* padding-right: 32px; */
  padding-bottom: 12px;
  padding: 0px 20px 12px;
  border-bottom: 1px solid #e9eef6;
`

const Label = styled(Text)`
  color: ${prop('theme.colors.font.primary')};
  font-size: 16px;
  line-height: 24px;
`

const Price = styled(Label)`
  font-size: 32px;
  line-height: 48px;
`

const Token = styled(Label)`
  color: #93959D;
`

const Bold = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #081343;
`
