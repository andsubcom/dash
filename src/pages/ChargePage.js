import React, { useState, useEffect } from 'react'
import { Flex, Grid, Text, Button } from '@chakra-ui/react'
import { prop } from 'styled-tools'
import { formatUnits } from '@ethersproject/units'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

import { PageWrapper, Sidebar, PageContainer } from 'modules/layout'
import styled from '@emotion/styled'
import { PageHeader } from 'modules/admin'
import { Loader } from 'elements'

import { useProductSubscribers, useRenewProductSubscriptions } from 'modules/subscription'

const ChargePage = () => {
  const { pid } = useParams()

  const subscribers = useProductSubscribers(pid)
  const totalSum = subscribers.reduce((acc, el) => {
    return acc + +(formatUnits(el.paymentAmount, 18))
  }, 0)

  const [isMining, setIsMining] = useState(true)
  const { state, send } = useRenewProductSubscriptions()

  const handleWithdraw = () => {
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
        onClick={handleWithdraw}
        padding='0px 32px'
        colorScheme='main'
        borderRadius='40px'
        textTransform='uppercase'
        fontSize='14px'
        fontWeight='500'
        size="md"
      >
      <Loader width={5} height={5} mr={2} /> Withdraw
    </Button>)
    } else {
      return (<Button
        key="0"
        onClick={handleWithdraw}
        padding='0px 32px'
        colorScheme='main'
        borderRadius='40px'
        textTransform='uppercase'
        fontSize='14px'
        fontWeight='500'
        size="md"
      >
      Withdraw
    </Button>)
    }
  }

  return (
    <PageWrapper>
      <Sidebar />
      <PageContainer>
        <PageHeader mb={'40px'} title='Subscribers' subtitle='Charge tokens from product subscribers' />
        <Flex><Text>Total summ: {totalSum}</Text> {renderButton()}</Flex>
        { subscribers.map(el => {
          return( <Flex>
            <Text>Address: {el.address} - </Text>
            <Text>Amount: {formatUnits(el.paymentAmount, 18)}</Text>
          </Flex> )
        })}
      </PageContainer>
    </PageWrapper>
  )
}

ChargePage.propTypes = {

}

export default ChargePage
