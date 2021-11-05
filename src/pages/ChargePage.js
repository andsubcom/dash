import React, { useState, useEffect } from 'react'
import { Flex, Box, Button, Text as _Text, HStack, VStack, Stack } from '@chakra-ui/react'
import { prop } from 'styled-tools'
import { formatUnits } from '@ethersproject/units'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import { PageWrapper, Sidebar, PageContainer } from 'modules/layout'
import styled from '@emotion/styled'
import { PageHeader } from 'modules/admin'
import { Loader, BackLink, Card, IPFSImage, StatsCard } from 'elements'

import { useProductSubscribers, useRenewProductSubscriptions, useProductInfo } from 'modules/subscription'
import { TOKENS, SUBSCRIPTION_PERIODS } from 'utils/constants'

const ChargePage = () => {
  const { pid } = useParams()
  const product = useProductInfo(pid)
  const subscribers = useProductSubscribers(pid)
  const [isMining, setIsMining] = useState(true)
  const { state, send } = useRenewProductSubscriptions()

  useEffect(() => {
    switch (state.status) {
      case 'Mining':
        if(!isMining) { toast.success('Transaction has been sent') }
        setIsMining(true)
        break
      case 'Success':
        if(isMining) { toast.success('Successfully withdraw money') }
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
  }, [state])

  const token = Object.keys(TOKENS).map(key => TOKENS[key])
      .find(token => token?.address?.toUpperCase() === product?.payableToken?.toUpperCase()) || {}
  const totalSum = subscribers.reduce((acc, el) => {
    return acc + +(formatUnits(el.paymentAmount, token.decimals || 18))
  }, 0)

  const totalPayedSum = subscribers.reduce((acc, el) => {
    return acc + +(formatUnits(el.totalAmount, token.decimals || 18))
  }, 0)


  const handleCharge = () => {
    send(pid)
  }

  const renderButton = () => {
    if(isMining) {
      return (<Button
        key="0"
        disabled
        onClick={handleCharge}
        width='100%'
        padding='4px 32px'
        colorScheme='main'
        borderRadius='40px'
        textTransform='uppercase'
        fontSize='16px'
        fontWeight='500'
        size="md"
      >
      <Loader width={5} height={5} mr={2} /> Claim
    </Button>)
    } else {
      return (<Button
        key="0"
        onClick={handleCharge}
        padding='4px 32px'
        width='100%'
        colorScheme='main'
        borderRadius='40px'
        textTransform='uppercase'
        fontSize='16px'
        fontWeight='500'
        size="md"
      >
      Claim
    </Button>)
    }
  }

  return (
    <PageWrapper>
      <Sidebar />
      <PageContainer>
        <BackLink>
          <Link to='/'>Back to Products</Link>
        </BackLink>
        <PageHeader mt={'16px'} mb={'40px'} title={product?.name} subtitle='Created on January 3rd 2021' />
        <Flex>
          <IPFSImage width='240px' height='240px' IPFSUrl={product?.metadataUri} />
          <Card w='768px' height='240px' ml='24px' flexDirection='column'>
            <Flex p='16px 24px' borderBottom='1px solid #FfF6F7'>
              <Label fontWeight='600'>DETAILS</Label>
            </Flex>
            <Flex p='16px 24px'>
              <VStack width='150px' alignItems='flex-start' spacing='16px'>
                <Label>Name</Label>
                <Label>Link</Label>
                <Label>Frequency</Label>
                <Label>Price</Label>
              </VStack>
              <VStack alignItems='flex-start'  spacing='16px'>
                <Text>{product?.name}</Text>
                <A href={`https://checkout.andsub.com/${product?.id}`} target='_blank'>https://checkout.andsub.com/{product?.id}</A>
                <Text>{product && SUBSCRIPTION_PERIODS[product.period.toNumber()]}</Text>
                <Text>{product && formatUnits(product.price.toString(), token.decimals || 18)} <A href="#" target="_blank">{token?.symbol}</A></Text>
              </VStack>
            </Flex>
          </Card>
        </Flex>
        <Flex mt='24px'>
          <Card
            width='240px'
            padding='16px'
            height='140px'>
              <Flex width='100%' alignItems='center' flexDirection='column'>
                <Label>Amount to Claim</Label>
                <Flex mt='4px' mb='8px' flexDirection='row' alignItems='flex-end'>
                  <Price
                    fontSize='32px'>
                      {totalSum}
                  </Price>
                  <Label ml='6px' mb='2px'>{token?.symbol}</Label>            
                </Flex>
                { renderButton() }
              </Flex>
          </Card>
          <Stack direction="row" spacing='24px' ml='24px' mb='40px'>
            <StatsCard height='140px' title="Montly Revenu" stat="0" bg="#EEF1F6" />
            <StatsCard height='140px' title="Daily Revenu" stat="0" bg="#E4F4F1" />
            <StatsCard height='140px' title="Total Revenue" stat={totalPayedSum + ' ' + token?.symbol} bg="#ECECFF" />
          </Stack>
        </Flex>
        {/* <Flex
          flexDirection='row'
        >
          <Card
            width='416px'
            height='160px'
            border='4px solid #fff'
            background='#E4F4F1'
            padding='24px 24px 8px 24px'
          >
            <Flex flexDirection='row' w='100%' justifyContent='space-between'>
              <Flex flexDirection='column'>
                <Box ml='-4px' mt='-2px' mb='8px'><Icon icon="ic:round-file-download" color="#B7E1D9" width="40" height="40" /></Box>
                <Label>Amount to Claim</Label>
                <Flex flexDirection='row' alignItems='flex-end'>
                  <Price
                    fontSize='32px'>
                      {totalSum}
                  </Price>
                  <Label ml='8px' mb='6px'>USDX</Label>            
                </Flex>
              </Flex>
              <Flex>
                { renderButton() }
              </Flex>
            </Flex>
          </Card>
        </Flex> */}
        <Flex mt='40px' flexDirection='row'>
          <Subheader>Subscribers</Subheader>
          <Subheader ml='12px' color='#93959D'>{subscribers.length}</Subheader>
        </Flex>
        <Table flexDirection='column' mt='24px' width='1032px'>
          <HStack padding='8px 22px' mb='8px'>
            <Box w='310px'><THeader>Address</THeader></Box>
            <Box w='230px'><THeader>Subscribed at</THeader></Box>
            <Box w='230px'><THeader>Payed</THeader></Box>
            <Box><THeader>Available</THeader></Box>
          </HStack>
          { subscribers.map((sub, i) => {
            return (
              <Row background={i % 2 === 1 ? '#fff' : '#f5f6f7'}>
                <Box w='310px'>
                  <A href={`https://ropsten.etherscan.io/address/` + sub.address} target='_blank'>{sub.address &&
                    `${sub.address.slice(0, 24)}...${sub.address.slice(
                      sub.address.length - 4,
                      sub.address.length
                    )}`}
                  </A>
                </Box>
                <Box w='230px'>
                  <Cell>{format(sub.subscriptionStartTime * 1000, "dd.MM.yyyy HH:mm")}</Cell>
                </Box>
                <Box w='230px'><Cell>{formatUnits(sub.totalAmount, 18)} USDX</Cell></Box>
                <Box><Cell fontWeight='600'>{formatUnits(sub.paymentAmount, 18)} USDX</Cell></Box>
              </Row>
            )
          }) }
        </Table>
        {/* <Flex><Text>Total summ: {totalSum}</Text> {renderButton()}</Flex>
        { subscribers.map(el => {
          return( <Flex>
            <Text>Address: {el.address} - </Text>
            <Text>Amount: {formatUnits(el.paymentAmount, 18)}</Text>
          </Flex> )
        })} */}
      </PageContainer>
    </PageWrapper>
  )
}

const Label = styled(_Text)`
  color: #93959D;
  font-size: 16px;
  line-height: 24px;
`

const Text = styled(_Text)`
  color: ${prop('theme.colors.font.primary')};
  font-size: 16px;
  line-height: 24px;
`

const Price = styled(_Text)`
  color: ${prop('theme.colors.font.primary')};
  font-size: 21px;
  line-height: 32px;
`

const Subheader = styled(_Text)`
  font-size: 24px;
  line-height: 36px;
`

const Table = styled(Card)`
  padding: 16px;
`

const THeader = styled(_Text)`
  font-size: 16px;
  line-height: 24px;
  color: #9CA1B4;
`

const Row = styled(HStack) `
  margin-top: 8px;
  padding: 8px 22px;
  border-radius: 8px;
`

const A = styled.a`
  cursor: pointer;
  color: ${prop('theme.colors.primary')};
  font-size: 16px;
  line-height: 24px;
`

const Cell = styled(_Text)`
  ${prop('theme.colors.primary')};
  font-size: 16px;
  line-height: 24px;
`

ChargePage.propTypes = {

}

export default ChargePage
