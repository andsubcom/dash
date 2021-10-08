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
  Input,
  Select
} from '@chakra-ui/react'

const FormInput = ({...props}) => (<Input
  borderRadius="15px"
  mb="24px"
  fontSize="sm"
  type="number"
  placeholder="Amount"
  size="lg"
  {...props}
  />)

const FormSelect = ({children,...props}) => (<Select
  borderRadius="15px"
  mb="24px"
  fontSize="sm"
  type="number"
  placeholder="Amount"
  size="lg"
  {...props}
  >
    {children}
  </Select>)

export default function SubscriptionModal({ isOpen, onClose }) {

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
                Name
              </FormLabel>
              <FormInput placeholder="Name" />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Amount
              </FormLabel>
              <FormInput placeholder="Amount" />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Period
              </FormLabel>
              <Select placeholder="Period" >
                <option value="300">5 minutes</option>
                <option value="900">15 minutes</option>
                <option value="1800">30 minutes</option>
              </Select>
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
