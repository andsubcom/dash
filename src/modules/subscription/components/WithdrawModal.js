import React from 'react'
import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import { prop } from 'styled-tools'

export default function WithdrawModal({ isOpen, onClose }) {

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
        <ModalHeader px={4} fontSize='xl' fontWeight='600'>
          Create Subscription
        </ModalHeader>
        <ModalCloseButton
          color='black.900'
          fontSize='sm'
          _hover={{
            color: 'black.700',
          }}
        />
        <ModalBody pt={0} px={4}>
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
              justifyContent='center'
              alignItems='center'
              width='100%'
              padding='16px 0px'
              >
              <Flex 
                borderWidth="2px"
                borderColor="main.400"
                justifyContent="center"
                alignItems="center"
                borderRadius="40px">
                <Button
                    key="0"
                    onClick={() => {  }}
                    colorScheme='main'
                    borderRadius='40px'
                    fontSize='15px'
                    fontWeight='600'
                    size="lg"
                  >
                  Withdraw
                </Button>
                <Bold p={'0px 16px 0px 8px'}> 324.32 USDX</Bold>
              </Flex>
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
  padding-right: 32px;
  margin-bottom: 12px;
`

const Bold = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #081343;
`
