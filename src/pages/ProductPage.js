import React, { useEffect, useState } from 'react'
import { Flex, useDisclosure, Box, Stack, Heading, Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { parseUnits, formatUnits } from '@ethersproject/units'
import { useEthers } from '@usedapp/core'
import toast from 'react-hot-toast'

import { PageWrapper, Sidebar } from 'modules/layout'
import { Card, Loader, StatsCard } from 'elements'
import styled from '@emotion/styled'
import { PageHeader, Table } from 'modules/admin'

import { SubscriptionModal, ProductItem, useSubscriptionInfoByOrg, useCreateProduct } from 'modules/subscription'

import { TOKENS, SUBSCRIPTION_PERIODS } from 'utils/constants'

const ProductPage = ({ history }) => {
  const { account } = useEthers()
  const [isMining, setIsMining] = useState(false)
  const { state, send } = useCreateProduct()

  const { isOpen, onOpen, onClose } = useDisclosure()
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

  const hadnleSubFormSubmit = (values) => {
    const id = values.id
    const name = values.name
    const description = values.description
    const payableToken = values.token
    const nftImage = values.nftImage
    const amount = parseUnits(values.amount + '', 18)
    const period = +(values.period)

    const uploadMetadataWithImageUrl = (imageUrl) => { return uploadMetadata(name, description, imageUrl) }

    const sendSubscriptionToSmartContract = (metadataUri) => {
      if (nftImage && !metadataUri) {
        // TODO: notify user about image loading failure
        return
      }
      console.log('metadataUri', metadataUri)
      // TODO: pass URI to create product call
      send(id, name, payableToken, amount, period, metadataUri || '')
    }

    uploadFileToIPFSUsingNFTPort(nftImage)
      .then(uploadMetadataWithImageUrl)
      .then(sendSubscriptionToSmartContract)
      .catch(err => { console.log('transaction error --->', err) })

    onClose()

  }

  // TODO: Add loader here
  // if(!products) { return <></> }

  const subscriptions = products.map((product, i) => {
    const token = Object.keys(TOKENS).map(key => TOKENS[key])
      .find(token => token.address.toUpperCase() === product.payableToken.toUpperCase())
    return {
      id: product.id,
      name: product.name,
      amount: formatUnits(product.amount, token.decimals),
      token: token,
      period: SUBSCRIPTION_PERIODS[product.period.toNumber()],
      uri: product.uri
    }
  })

  console.log('products', products)

  return (
    <PageWrapper>
      <Sidebar />
      <PageContainer>
        <PageHeader mb={'40px'} title='Products' subtitle='Information about your current plan and usages' />
        <Stack direction="row" spacing='24px' mb='40px'>
          <StatsCard title="Monthly Revenue" stat="$31 240" bg="#ECECFF" />
          <StatsCard title="Active Subs" stat="3 432" bg="#EEF1F6" />
          <StatsCard title="Daily Subs" stat="14" bg="#E4F4F1" />
          <StatsCard title="Monthly Subs" stat="146" bg="#F5F1DA" />
        </Stack>
        <Box>
          <Stack direction="row" alignItems="top" marginBottom="1.5rem">
            <Heading size="md">Manage products</Heading>
            <Stack direction={["column", "row"]} style={{ marginLeft: "auto" }}>
              <Button
                key="0"
                leftIcon={<AddIcon />}
                onClick={() => { history.push('/product/create') }}
                colorScheme='main'
                borderRadius='40px'
                fontSize='14px'
                textTransform='uppercase'
                fontWeight='600'
                size="sm"
              >
                Add product
              </Button>
            </Stack>
          </Stack>
          <Stack w="1024px" direction="column" spacing="16px">
            { subscriptions.map( product => (<ProductItem key={product.id} product={product} />)) }
          </Stack>
        </Box>

      </PageContainer>
      <SubscriptionModal onSubmit={hadnleSubFormSubmit} isOpen={isOpen} onClose={onClose} />
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

ProductPage.propTypes = {

}

export default ProductPage
