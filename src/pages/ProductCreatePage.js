import React, { useEffect, useState } from 'react'
import { 
  Flex,
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea
} from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import toast from 'react-hot-toast'

import { PageWrapper, Sidebar } from 'modules/layout'
import { Card, Loader, NFTUpload } from 'elements'
import styled from '@emotion/styled'
import { PageHeader } from 'modules/admin'

import { useSubscriptionInfoByOrg, useCreateProduct } from 'modules/subscription'

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

const ProductCreatePage = () => {
  const { account } = useEthers()
  const [isMining, setIsMining] = useState(false)
  const { state, send } = useCreateProduct()

  const { products, refetch } = useSubscriptionInfoByOrg(account)

  useEffect(() => {
    switch (state.status) {
      case 'Mining':
        if(!isMining) { toast.success('Transaction has been sent') }
        setIsMining(true)
        break
      case 'Success':
        refetch()
        if(isMining) { toast.success('Product created') }
        setIsMining(false)
        break
      case 'Exception':
        toast.error(state.errorMessage)
        setIsMining(false)
        break

      default:
        setIsMining(false)
        break
    }
  }, [state, refetch, toast])

  const toIpfsUrl = (url) => {
    const urlToFile = new URL(url)
    if (urlToFile.protocol === "ipfs:") {
      return url
    } else if (urlToFile.protocol === "https:") {
      const pathComponents = urlToFile.pathname.split("/")
      if (pathComponents.length > 0) {
        return "ipfs://" + pathComponents[pathComponents.length - 1]
      }
    }
    return null
  }

  const uploadFileToIPFSUsingNFTPort = (file) => {
    if (file == null) {
      return Promise.resolve(null)
    }
    const form = new FormData();
    form.append('file', file);

    const options = {
      method: 'POST',
      body: form,
      headers: {
        "Authorization": process.env.REACT_APP_NFT_PORT_API_KEY,
      },
    };

    return fetch("https://api.nftport.xyz/v0/files", options)
      .then(response => { return response.json() })
      .then(json => { return toIpfsUrl(json["ipfs_url"]) }) // response contains https url to file from ipfs
  }

  const uploadMetadata = (name, description, fileUrl) => {
    if (name == null || fileUrl == null) {
      return Promise.resolve(null)
    }
    const jsonContent = {
      name: name,
      description: description || `Subscription to ${name}`,
      file_url: fileUrl
    }

    console.log(jsonContent)

    const options = {
      method: 'POST',
      body: JSON.stringify(jsonContent),
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.REACT_APP_NFT_PORT_API_KEY
      }
    };

    return fetch("https://api.nftport.xyz/v0/metadata", options)
      .then(response => { return response.json() })
      .then(json => { return json["metadata_uri"] })
  }

  // const hadnleSubFormSubmit = (values) => {
  //   const id = values.id
  //   const name = values.name
  //   const description = values.description
  //   const payableToken = values.token
  //   const nftImage = values.nftImage
  //   const amount = parseUnits(values.amount + '', 18)
  //   const period = +(values.period)

  //   const uploadMetadataWithImageUrl = (imageUrl) => { return uploadMetadata(name, description, imageUrl) }

  //   const sendSubscriptionToSmartContract = (metadataUri) => {
  //     if (nftImage && !metadataUri) {
  //       // TODO: notify user about image loading failure
  //       return
  //     }
  //     console.log('metadataUri', metadataUri)
  //     // TODO: pass URI to create product call
  //     send(id, name, payableToken, amount, period, metadataUri || '')
  //   }

  //   uploadFileToIPFSUsingNFTPort(nftImage)
  //     .then(uploadMetadataWithImageUrl)
  //     .then(sendSubscriptionToSmartContract)
  //     .catch(err => { console.log('transaction error --->', err) })

  //   onClose()
  // }


  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object({
      'id': Yup.string()
        .required('Required filed'),
      'name': Yup.string()
        .required('Required filed'),
      'description': Yup.string(),
      'amount': Yup.string()
        .required('Required filed'),
      'period': Yup.string()
        .required('Required filed'),
      'token': Yup.string()
        .required('Required filed'),
    }),
    onSubmit: (values, { resetForm }) => {
      // onSubmit(values)

      resetForm()
    }
  })

  const uploadImage = (event) => {
    formik.values['nftImage'] = event.target.files[0]
  }

  return (
    <PageWrapper>
      <Sidebar />
      <PageContainer>
        <PageHeader mb={'54px'} title='Create product' subtitle='Subscription details and NFT token data' />
          <Card width='640px' padding='16px 12px'>
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
              <Heading size="md">Subscription details</Heading>
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
              <FormControl isInvalid={formik.errors['amount'] && formik.touched['amount']}>
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Price
                </FormLabel>
                <FormInput
                  name={'amount'}
                  id={'amount'}
                  type='number'
                  value={formik.values['amount']}
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
              <Heading size="md">NFT data</Heading>
              <Flex flexDirection='row'>
                <NFTUpload mt='28px' mr='12px' onChange={uploadImage} />
                <FormControl isInvalid={formik.errors['description'] && formik.touched['description']}>
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    Description
                  </FormLabel>
                  <Textarea
                      name={'description'}
                      id={'description'}
                      value={formik.values['description']}
                      onChange={formik.handleChange}
                      rows='7'
                      resize={false}
                      placeholder='Enter optional NFT description' />
                </FormControl>
               
              </Flex>
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
      </Card>
      </PageContainer>
    </PageWrapper>
  )
}

const PageContainer = styled(Flex)`
  padding: 40px 60px;
  width: calc(100% - 260px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

ProductCreatePage.propTypes = {

}

export default ProductCreatePage
