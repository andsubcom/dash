import React, { useCallback, useEffect, useState } from 'react'
import { Flex, Grid, Text, useDisclosure, Box, Stack, Heading, Button } from '@chakra-ui/react'
import { prop } from 'styled-tools'
import { parseUnits, formatUnits } from '@ethersproject/units'

import { PageWrapper, Sidebar } from 'modules/layout'
import { Paper, User, Graph } from 'react-iconly'
import { Card, Loader } from 'elements'
import styled from '@emotion/styled'
import { PageHeader, Table } from 'modules/admin'

import { SubscriptionModal, useSubscriptionInfoByOrg, useCreateProduct } from 'modules/subscription'

import { TOKENS, SUBSCRIPTION_PERIODS } from 'utils/constants'

const ORG_ID = 0

const AdminPage = () => {
  const [isMining, setIsMining] = useState(false)
  const { state, send } = useCreateProduct()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { products, refetch } = useSubscriptionInfoByOrg(ORG_ID)

  useEffect(() => {
    switch (state.status) {
      case 'Mining':
        setIsMining(true)
        break
      case 'Success':
        refetch()
        setIsMining(false)
        break
    
      default:
        setIsMining(false)
        break
    }
  }, [state, refetch])

  const hadnleSubFormSubmit = useCallback((values) => {
    const organizationId = ORG_ID
    const name = values.name
    const payableToken = values.token
    const amount = parseUnits(values.amount + '', 18)
    const period = +(values.period)

    // show loader
    console.log(values, 'organizationId, name, payableToken, amount, period', organizationId, name, payableToken, amount, period)
    send(organizationId, name, payableToken, amount, period)
    onClose()
  }, [onClose, send])

  // TODO: Add loader here
  // if(!products) { return <></> }

  const subscriptions = products.map((product, i) => {
    const token = Object.keys(TOKENS).map(key => TOKENS[key]).find(token => token.address === product.payableToken)
    return {
      id: i,
      name: `Subscription ${i}`,
      amount: formatUnits(product.amount, token.decimals),
      token: token.symbol,
      period: SUBSCRIPTION_PERIODS[product.period.toNumber()],
      subscribers: 15
    }
  })

  const subscriptionHeaders = [
    {
      id: "id",
      title: "ID",
    },
    {
      id: "name",
      title: "Name",
    },
    {
      id: "amount",
      title: "Amount",
    },
    {
      id: "token",
      title: "Token",
    },
    {
      id: "period",
      title: "Period",
    },
    {
      id: "subscribers",
      title: "Subscribers",
    }
  ]

  const renderSubButton = () => {
    if(isMining) {
      return (<Button
        key="0"
        onClick={() => {}}
        disabled
        colorScheme="main"
        size="sm"
      >
        <Loader width={5} height={5} mr={2} /> Creating product
      </Button>)
    } else {
      return (<Button
        key="0"
        onClick={onOpen}
        colorScheme="main"
        size="sm"
      >
        Add product
      </Button>)
    }
  }


  return (
    <PageWrapper>
      <Sidebar />
      <PageContainer>
        <PageHeader mb={'54px'} title='Subscriptions' subtitle='Information about your current plan and usages' />
        <Card width='800px' mb='36px'>
          <Grid padding='32px 30px' w='100%' templateColumns="repeat(4, 1fr)" gap={6}>
            <Flex flexDirection='row' w="100%">
              <DashIconContainer color='#FFF7F0'>
                <Paper set="bold" primaryColor="#FF6A00"/>
              </DashIconContainer>
              <Flex ml='12px' flexDirection='column' >
                <DashLabel>Plans</DashLabel>
                <DashText>3</DashText>
              </Flex>
            </Flex>
            <Flex flexDirection='row' w="100%">
              <DashIconContainer color='#f3f0ff'>
                <User set="bold" primaryColor="#551fff"/>
              </DashIconContainer>
              <Flex ml='12px' flexDirection='column' >
                <DashLabel>Users</DashLabel>
                <DashText>189</DashText>
              </Flex>
            </Flex>
            <Flex flexDirection='row' w="100%">
              <DashIconContainer color='#fff2f5'>
                <Graph set="bold" primaryColor="#fd2254"/>
              </DashIconContainer>
              <Flex ml='12px' flexDirection='column' >
                <DashLabel>Blabla</DashLabel>
                <DashText>123 / 459</DashText>
              </Flex>
            </Flex>
            <Flex flexDirection='row' w="100%">
              <DashIconContainer color='#fff2f5'>
                <Graph set="bold" primaryColor="#fd2254"/>
              </DashIconContainer>
              <Flex ml='12px' flexDirection='column' >
                <DashLabel>Blabla</DashLabel>
                <DashText>123 / 459</DashText>
              </Flex>
            </Flex>
          </Grid>
        </Card>
        <Box>
          <Stack direction="row" alignItems="top" marginBottom="1.5rem">
            <Heading size="md">Manage products</Heading>
            <Stack direction={["column", "row"]} style={{ marginLeft: "auto" }}>
              { renderSubButton() }
            </Stack>
          </Stack>
          <Card width='800px'>
            <Table headers={subscriptionHeaders} items={subscriptions} />
          </Card>
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

const DashIconContainer = styled(Flex)`
  width: 63px;
  height: 63px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  background: ${prop('color')};
`

const DashLabel = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #92959E;
  margin: 6px 0px 8px 0px;
`

const DashText = styled(Text)`
  font-size: 19px;
  line-height: 23px;
  color: #15192C;
`

AdminPage.propTypes = {

}

export default AdminPage
