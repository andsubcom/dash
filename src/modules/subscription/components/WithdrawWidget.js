import React, { useState, useEffect } from 'react'
import { Button } from '@chakra-ui/react'
import { Loader } from 'elements'
import toast from 'react-hot-toast'

import { useWithdrawPaymentForProduct } from 'modules/subscription'

function WithdrawWidget({product}) {
  const [isMining, setIsMining] = useState(false)
  const { state, send } = useWithdrawPaymentForProduct(product.id)

  const handleWithdraw = () => {
    send(product.id)
  }

  console.log('state', state)

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

