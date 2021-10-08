import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Grid, Text } from '@chakra-ui/react'
import { prop } from 'styled-tools'
import { formatFixed, formatUnits } from '@ethersproject/units'

import { Header, PageWrapper, Sidebar } from 'modules/layout'
import { Paper, User, Graph } from 'react-iconly'
import { Card } from 'elements'
import styled from '@emotion/styled'
import { PageHeader, PageContent, Table } from 'modules/admin'

import { useSubscriptionInfoByOrg } from 'modules/subscription'

import { TOKENS, SUBSCRIPTION_PERIODS } from 'utils/constants'

const AdminPage = () => {
  // const result = useGetSubscriptions(0)
  // const result1 = useSubscriptionInfo(0)
  const products = useSubscriptionInfoByOrg(0)

  // TODO: Add loader here
  if(!products) { return <></> }

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
        <PageContent
          title="Manage plans"
          primaryAction={{
            content: "Add Subscription",
            onClick: () => {
              alert('organization_1')
            },
          }}
        >
          <Card width='800px'>
            <Table headers={subscriptionHeaders} items={subscriptions} />
          </Card>
        </PageContent>
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

// const AdminPage = () => {

//   const selectedOrganization = 'Organization 1'

//   const organizations = [
//     { name: 'Organization 1' },
//     { name: 'Organization 2' },
//     { name: 'Organization 3' },
//   ]

  // const subscriptions = [
  //   {
  //     name: "Subscription 1",
  //     subscribers: 1249,
  //     amount: "50$",
  //     period: "month",
  //   },
  //   {
  //     name: "Subscription 2",
  //     subscribers: 149,
  //     amount: "150$",
  //     period: "year",
  //   },
  //   {
  //     name: "Subscription 3",
  //     subscribers: 193,
  //     amount: "150$",
  //     period: "year",
  //   },
  // ];

  // const subscriptionHeaders = [
  //   {
  //     id: "name",
  //     title: "Name",
  //   },
  //   {
  //     id: "subscribers",
  //     title: "Subscribers",
  //   },
  //   {
  //     id: "amount",
  //     title: "Amount",
  //   },
  //   {
  //     id: "period",
  //     title: "Period",
  //   },
  // ];

//   return (
//     <PageWrapper>
//       <Header />
//       <Flex w='1220px'>
//         <Flex
//           width='320px'
//           flexDirection='column'
//           paddingTop="1.5rem"
//           paddingLeft="12px"
//           paddingRight="12px"
//         >
//           <Heading marginBottom="1.5rem" size="lg">Organizations</Heading>
//           <Flex
//             flexDirection='column'
//           >
//             {organizations.map(el => {
//               return (
//                 <OrganizationItem color={el.name === selectedOrganization ? 'main.600' : ''}>
//                   {el.name}
//                 </OrganizationItem>
//               )
//             })}
//             <Flex mt='12px' alignItems='center' justifyContent='center'>
//               <Button
//                 key="0"
//                 colorScheme="main"
//                 onClick={() => {
//                   alert('organization_1')
//                 }}
//                 size="sm"
//               >
//                 Add Organization
//               </Button>
//             </Flex>
//           </Flex>
//         </Flex>
//         <PageContent
//           title="Subscriptions"
//           primaryAction={{
//             content: "Add Subscription",
//             onClick: () => {
//               alert('organization_1')
//             },
//           }}
//         >
//           <Table headers={subscriptionHeaders} items={subscriptions} />
//         </PageContent>
//       </Flex>
//     </PageWrapper>
//   )
// }
