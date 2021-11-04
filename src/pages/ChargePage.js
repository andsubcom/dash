import React, { useState, useEffect } from 'react'
import { Flex, Box, Button, Text, HStack } from '@chakra-ui/react'
import { prop } from 'styled-tools'
import { formatUnits } from '@ethersproject/units'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { format } from 'date-fns'

import { PageWrapper, Sidebar, PageContainer } from 'modules/layout'
import styled from '@emotion/styled'
import { PageHeader } from 'modules/admin'
import { Loader, BackLink, Card, IPFSImage } from 'elements'

import { useProductSubscribers, useRenewProductSubscriptions, useProductInfo } from 'modules/subscription'
import { TOKENS } from 'utils/constants'

const ChargePage = () => {
  const { pid } = useParams()
  const product = useProductInfo(pid)
  const token = Object.keys(TOKENS).map(key => TOKENS[key])
      .find(token => token?.address?.toUpperCase() === product?.payableToken?.toUpperCase()) || {}

  const subscribers = useProductSubscribers(pid)
  const totalSum = subscribers.reduce((acc, el) => {
    return acc + +(formatUnits(el.paymentAmount, token.decimals || 18))
  }, 0)

  const [isMining, setIsMining] = useState(true)
  const { state, send } = useRenewProductSubscriptions()

  const handleCharge = () => {
    send(pid)
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
        onClick={handleCharge}
        padding='0px 32px'
        colorScheme='main'
        borderRadius='40px'
        textTransform='uppercase'
        fontSize='14px'
        fontWeight='500'
        size="md"
      >
      <Loader width={5} height={5} mr={2} /> Charge
    </Button>)
    } else {
      return (<Button
        key="0"
        onClick={handleCharge}
        padding='0px 32px'
        colorScheme='main'
        borderRadius='40px'
        textTransform='uppercase'
        fontSize='14px'
        fontWeight='500'
        size="md"
      >
      Charge
    </Button>)
    }
  }

  console.log('subscribers', subscribers)

  return (
    <PageWrapper>
      <Sidebar />
      <PageContainer>
        <BackLink>
          <Link to='/'>Back to Products</Link>
        </BackLink>
        <PageHeader mt={'16px'} mb={'40px'} title={product.name} />
        <Flex
          flexDirection='row'
          mb='40px'
        >
          <Card padding='16px' width='592px' height='160px' mr='24px'>
            <IPFSImage width='128px' height='128px' IPFSUrl={product.metadataUri} />
          </Card>
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
        </Flex>
        <Flex flexDirection='row'>
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

const Label = styled(Text)`
  color: #93959D;
  font-size: 16px;
  line-height: 24px;
`

const Price = styled(Text)`
  color: ${prop('theme.colors.font.primary')};
  font-size: 32px;
  line-height: 48px;
`

const Subheader = styled(Text)`
  font-size: 24px;
  line-height: 36px;
`

const Table = styled(Card)`
  padding: 16px;
`

const THeader = styled(Text)`
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

const Cell = styled(Text)`
  ${prop('theme.colors.primary')};
  font-size: 16px;
  line-height: 24px;
`

const ProductCell = styled(Flex)`
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const Bold = styled(Box)`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #081343;
`


ChargePage.propTypes = {

}

export default ChargePage
