import React from 'react'
import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select
} from '@chakra-ui/react'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TOKENS, SUBSCRIPTION_PERIODS } from 'utils/constants'

const FormInput = ({...props}) => (<Input
  borderRadius="4px"
  mb="24px"
  fontSize="sm"
  type="text"
  placeholder="Amount"
  size="lg"
  {...props}
  />)

const FormSelect = ({children,...props}) => (<Select
  borderRadius="4px"
  mb="24px"
  fontSize="sm"
  type="number"
  placeholder="Amount"
  size="lg"
  {...props}
  >
    {children}
  </Select>)

export default function SubscriptionModal({ isOpen, onClose, onSubmit }) {
  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object({
      'id': Yup.string()
        .required('Required filed'),
      'name': Yup.string()
        .required('Required filed'),
      'description': Yup.string(),
      'price': Yup.string()
        .required('Required filed'),
      'period': Yup.string()
        .required('Required filed'),
      'token': Yup.string()
        .required('Required filed'),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values)
      resetForm()
    }
  })

  const uploadImage = (event) => {
    formik.values['nftImage'] = event.target.files[0]
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='md'>
      <ModalOverlay />
      <ModalContent
        background='#f8f9fc'
        border='1px'
        borderStyle='solid'
        borderColor='whiteAlpha.700'
        borderRadius='4px'
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
            <form onSubmit={formik.handleSubmit}>
              <FormControl isInvalid={formik.errors['id'] && formik.touched['id']}>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  ID
                </FormLabel>
                <FormInput
                  name={'id'}
                  id={'id'}
                  value={formik.values['id']}
                  onChange={formik.handleChange}
                  placeholder='ansub_pro_monthly' />
              </FormControl>
              <FormControl isInvalid={formik.errors['name'] && formik.touched['name']}>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Name
                </FormLabel>
                <FormInput
                  name={'name'}
                  id={'name'}
                  value={formik.values['name']}
                  onChange={formik.handleChange}
                  placeholder='Enter name' />
              </FormControl>
              <FormControl isInvalid={formik.errors['description'] && formik.touched['description']}>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Description
                </FormLabel>
                <FormInput
                    name={'description'}
                    id={'description'}
                    value={formik.values['description']}
                    onChange={formik.handleChange}
                    placeholder='Enter optional NFT description' />
              </FormControl>
              <FormControl isInvalid={formik.errors['amount'] && formik.touched['amount']}>
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Price
                </FormLabel>
                <FormInput
                  name={'price'}
                  id={'price'}
                  type='number'
                  value={formik.values['price']}
                  onChange={formik.handleChange}
                  placeholder='Enter price per period' />
              </FormControl>
              <FormControl isInvalid={formik.errors['period'] && formik.touched['period']}>
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Period
                </FormLabel>
                <FormSelect 
                  name={'period'}
                  id={'period'}
                  value={formik.values['period']}
                  onChange={formik.handleChange}
                  placeholder='Select period' >
                  { 
                    Object.keys(SUBSCRIPTION_PERIODS).map((key) => {
                      return <option value={key}>{SUBSCRIPTION_PERIODS[key]}</option>
                    }) 
                  }
                </FormSelect>
               </FormControl>
              <FormControl isInvalid={formik.errors['period'] && formik.touched['period']}>
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Token
                </FormLabel>
                <FormSelect
                  name={'token'}
                  id={'token'}
                  value={formik.values['token']}
                  onChange={formik.handleChange}
                  placeholder='Select token' >
                  {
                    Object.keys(TOKENS).map((key) => {
                      return <option value={TOKENS[key].address}>{`${TOKENS[key].name} (${TOKENS[key].symbol})`}</option>
                    }) 
                  }
                </FormSelect>
               </FormControl>
              <input
                  type='file'
                  id='nftImage'
                  name='nftImage'
                  onChange={uploadImage}
                  accept='.jpg,.jpeg,.png,.svg'
              />
               <Button
                  fontSize='12px'
                  type='submit'
                  colorScheme='main'
                  w='100%'
                  h='45'
                  mb='20px'
                  color='white'
                  mt='20px'
                >
                  CREATE
                </Button>
            </form>
          </Flex>
        </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
