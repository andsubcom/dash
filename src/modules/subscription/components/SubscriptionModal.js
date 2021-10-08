import React from 'react'
import {
  Button,
  Flex,
  Link,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  FormControl,
  Switch,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { ExternalLinkIcon, CopyIcon } from '@chakra-ui/icons'
import { useEthers } from '@usedapp/core'

import { Asset } from 'modules/wallet'
import { useAddressAssets } from 'defi-sdk'

export default function SubscriptionModal({ isOpen, onClose }) {
  const { account, deactivate } = useEthers()

  const assets = useAddressAssets(
    {
      currency: 'USD',
      address: account || '',
    },
    {
      enabled: Boolean(account),
    },
  )

  function handleDeactivateAccount() {
    deactivate()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='md'>
      <ModalOverlay />
      <ModalContent
        background='#f8f9fc'
        border='1px'
        borderStyle='solid'
        borderColor='whiteAlpha.700'
        borderRadius='3xl'
      >
        <ModalHeader color='#15192C' px={4} fontSize='lg' fontWeight='medium'>
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
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%"}}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="12px"
          >
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                ID
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="text"
                placeholder="ID"
                size="lg"
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Name
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="text"
                placeholder="Name"
                size="lg"
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Amount
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="number"
                placeholder="Amount"
                size="lg"
              />
              <Button
                fontSize="12px"
                type="submit"
                colorScheme='main'
                w="100%"
                h="45"
                mb="20px"
                color="white"
                mt="20px"
              >
                CREATE
              </Button>
            </FormControl>
          </Flex>
        </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
