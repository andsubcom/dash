import React, { useState } from 'react'
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

export default function SubscriptionModal({ isOpen, onClose, onSubmit }) {
  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object({
      'name': Yup.string()
        .required('Required filed'),
      'amount': Yup.string()
        .required('Required filed'),
    }),
    onSubmit: values => {
      onSubmit(values)
    }
  })

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
            <form onSubmit={formik.handleSubmit}>
              <FormControl isInvalid={formik.errors['name'] && formik.touched['name']}>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Name
                </FormLabel>
                <FormInput
                  name={'name'}
                  id={'name'}
                  value={formik.values['name']}
                  onChange={formik.handleChange}
                  placeholder="Name" />
              </FormControl>
              <FormControl isInvalid={formik.errors['amount'] && formik.touched['amount']}>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Amount
                </FormLabel>
                <FormInput
                  name={'amount'}
                  id={'amount'}
                  value={formik.values['amount']}
                  onChange={formik.handleChange}
                  placeholder='Amount' />
              </FormControl>
              <FormControl isInvalid={formik.errors['period'] && formik.touched['period']}>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Period
                </FormLabel>
                <FormSelect 
                  name={'period'}
                  id={'period'}
                  value={formik.values['period']}
                  onChange={formik.handleChange} 
                  placeholder="Period" >
                  <option selected value="300">5 minutes</option>
                  <option value="900">15 minutes</option>
                  <option value="1800">30 minutes</option>
                </FormSelect>
               </FormControl>
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
            </form>
          </Flex>
        </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

// function InviteFormSingle ({ values, isLoading, isInvited, isDisabled, onInvite }) {
//   const [name, value] = Object.entries(values)[0]
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const formik = useFormik({
//     initialValues: { [name]: '' },
//     validationSchema: Yup.object({
//       [name]: Yup.string()
//         .email('Please enter valid email address.')
//         .required('Please enter your email address')
//     }),
//     onSubmit: values => {
//       setIsSubmitting(true)
//       onInvite(name, values[name])
//     }
//   })

//   return (
//     <>
//       <form onSubmit={formik.handleSubmit}>
//         <FormControl width="100%" isInvalid={formik.errors[name] && formik.touched[name]}>
//           <FormLabel htmlFor={name}>Email</FormLabel>
//           <TextInput
//             focusBorderColor="primary"
//             size="sm"
//             rounded="4px"
//             name={name}
//             id={name}
//             value={formik.values[name]}
//             onChange={formik.handleChange}
//             isDisabled={(isSubmitting && isLoading) || isInvited || isDisabled}
//             isReadOnly={isInvited}
//             placeholder={t('inviteModal.Enter email address')} />
//           <FormErrorMessage mb="1">{formik.errors[name]}</FormErrorMessage>
//         </FormControl>

//         <Box textAlign="center" width="100%" mt="6">
//           <Button
//             type="submit"
//             size="md"
//             variantColor="primary"
//             minWidth="136px"
//             minHeight="38px"
//             borderRadius="8px"
//             fontWeight="medium"
//             isDisabled={isDisabled}
//             isLoading={isSubmitting && isLoading}>
//             {t('Invite')}
//           </Button>
//         </Box>
//       </form>
//     </>
//   )
// }