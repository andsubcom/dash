import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Heading, Text, Button } from '@chakra-ui/react'

import { PageContainer, PageContent, Nav, Table } from 'modules/admin'
import styled from '@emotion/styled'

const AdminPage = () => {

  const selectedOrganization = 'Organization 1'

  const organizations = [
    { name: 'Organization 1' },
    { name: 'Organization 2' },
    { name: 'Organization 3' },
  ]

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
  ];

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
  ];

  return (
    <PageContainer isFixedNav>
      <Nav />
      <Flex w='1220px'>
        <Flex
          width='320px'
          flexDirection='column'
          paddingTop="1.5rem"
          paddingLeft="12px"
          paddingRight="12px"
        >
          <Heading marginBottom="1.5rem" size="lg">Organizations</Heading>
          <Flex
            flexDirection='column'
          >
            {organizations.map(el => {
              return (
                <OrganizationItem color={el.name === selectedOrganization ? 'main.600' : ''}>
                  {el.name}
                </OrganizationItem>
              )
            })}
            <Flex mt='12px' alignItems='center' justifyContent='center'>
              <Button
                key="0"
                colorScheme="main"
                onClick={() => {
                  alert('organization_1')
                }}
                size="sm"
              >
                Add Organization
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <PageContent
          title="Subscriptions"
          primaryAction={{
            content: "Add Subscription",
            onClick: () => {
              alert('organization_1')
            },
          }}
        >
          <Table headers={subscriptionHeaders} items={subscriptions} />
        </PageContent>
      </Flex>
    </PageContainer>
  )
}

const OrganizationItem = styled(Text)`
  cursor: pointer;
  padding-left: 2px;
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 12px;
  margin-bottom: 8px;
  border-bottom: 1px solid #c3c3c3;
`

AdminPage.propTypes = {

}

export default AdminPage
