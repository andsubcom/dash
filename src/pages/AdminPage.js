import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@chakra-ui/react'

import { Header, PageWrapper, Sidebar } from 'modules/layout'
import { Card } from 'elements'
import styled from '@emotion/styled'
import { PageHeader, PageContent, Table } from 'modules/admin'

const AdminPage = () => {

  const subscriptions = [
    {
      name: "Subscription 1",
      subscribers: 1249,
      amount: "50$",
      period: "month",
    },
    {
      name: "Subscription 2",
      subscribers: 149,
      amount: "150$",
      period: "year",
    },
    {
      name: "Subscription 3",
      subscribers: 193,
      amount: "150$",
      period: "year",
    },
  ]

  const subscriptionHeaders = [
    {
      id: "name",
      title: "Name",
    },
    {
      id: "subscribers",
      title: "Subscribers",
    },
    {
      id: "amount",
      title: "Amount",
    },
    {
      id: "period",
      title: "Period",
    },
  ]


  return (
    <PageWrapper>
      <Sidebar />
      <PageContainer>
        <PageHeader mb={'54px'} title='Subscriptions' subtitle='Information about your current plan and usages' />
        <PageContent
          title="Active"
          primaryAction={{
            content: "Add Subscription",
            onClick: () => {
              alert('organization_1')
            },
          }}
        >
          <Card width='760px'>
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
