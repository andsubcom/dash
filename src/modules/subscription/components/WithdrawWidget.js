import React, { useState, useEffect } from 'react'
import { Button } from '@chakra-ui/react'
import { Loader } from 'elements'

import { useWithdrawPaymentForProduct } from 'modules/subscription'


function WithdrawWidget({product}) {
  const [isMining, setIsMining] = useState(false)
  const { state, send } = useWithdrawPaymentForProduct(product.id)

  console.log('product ----->', product, state, send)

  const handleWithdraw = () => {
    setIsMining(true)
    send(product.id)
  }

  useEffect(() => {
    switch (state.status) {
      case 'Mining':
        setIsMining(true)
        break
      case 'Success':
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
        minW={'125px'}
        onClick={() => {}}
        disabled
        colorScheme="pink"
        variant='outline'
        size="sm"
      >
        <Loader color={'#b83280'} width={5} height={5} mr={2} /> Processing
      </Button>)
    } else {
      return (<Button
        key="0"
        minW={'125px'}
        onClick={handleWithdraw}
        colorScheme="pink"
        variant='outline'
        size="sm"
      >
        Withdraw
      </Button>)
    }
  }

  return (
    <>
      { renderButton() }
    </>
  )
}

WithdrawWidget.propTypes = {

}

export default WithdrawWidget

