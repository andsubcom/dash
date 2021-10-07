import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@chakra-ui/react'

import { Header, PageWrapper, Sidebar } from 'modules/layout'
import styled from '@emotion/styled'
import { PageHeader } from 'modules/admin'

const AdminPage = () => {
  return (
    <PageWrapper>
      <Sidebar />
      <PageContainer>
        <PageHeader title='Subscriptions' subtitle='Information about your current plan and usages' />
      </PageContainer>
    </PageWrapper>
  )
}

const PageContainer = styled(Flex)`
  padding: 40px 60px;
  width: calc(100% - 260px);
`

AdminPage.propTypes = {

}

export default AdminPage
