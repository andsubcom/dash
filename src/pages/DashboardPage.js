import React from 'react'
import { Flex, Grid, Text } from '@chakra-ui/react'
import { prop } from 'styled-tools'

import { PageWrapper, Sidebar } from 'modules/layout'
import { Paper, User, Graph } from 'react-iconly'
import { Card } from 'elements'
import styled from '@emotion/styled'
import { PageHeader } from 'modules/admin'

const AdminPage = () => {
  return (
    <PageWrapper>
      <Sidebar />
      <PageContainer>
        <PageHeader mb={'54px'} title='Dashboard' subtitle='Information about your current plan and usages' />
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
