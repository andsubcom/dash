import { useEffect, useState, useCallback } from 'react'
import { useContractCall, useContractFunction, useEthers } from '@usedapp/core'
import { Contract } from 'ethers'
import { Interface } from '@ethersproject/abi'
import SUBSCRIPTION_HUB_ABI from 'assets/abi/SubscriptionsHub.json'


const ANDSUB_HUB_ADDRESS = process.env.REACT_APP_SUBSCRIPTION_HUB_ADDRESS


export const fetchProductInfo = async function (provider, productId) {
  const contract = new Contract(ANDSUB_HUB_ADDRESS, SUBSCRIPTION_HUB_ABI, provider)
  return await contract.getProductInfo(productId)
}

export const fetchOwnerProducts = async function (provider, account) {
  const contract = new Contract(ANDSUB_HUB_ADDRESS, SUBSCRIPTION_HUB_ABI, provider)
  const productIds = await contract.getOwnerProductIds(account)
  const requests = productIds.map((productId) => contract.getProductInfo(productId))
  return await Promise.all(requests)
}


export const useSubscriptionInfo = (productId) => {
  const [amount, payableToken, period, organizationId] = useContractCall({
    abi: new Interface(SUBSCRIPTION_HUB_ABI),
    address: process.env.REACT_APP_SUBSCRIPTION_HUB_ADDRESS,
    method: 'getSubscriptionInfo',
    args: [productId]
  }) ?? []
  return {
    amount,
    payableToken,
    period,
    organizationId
  }
}

export const useIsAccountSubscribed = (account, productId) => {
  const [isSubscribed] = useContractCall({
    abi: new Interface(SUBSCRIPTION_HUB_ABI),
    address: process.env.REACT_APP_SUBSCRIPTION_HUB_ADDRESS,
    method: 'checkUserHasActiveSubscription',
    args: [account, productId]
  }) ?? []
  return isSubscribed
}


export const useGetSubscriptions = (organizationId) => {
  const result = useContractCall({
    abi: new Interface(SUBSCRIPTION_HUB_ABI),
    address: process.env.REACT_APP_SUBSCRIPTION_HUB_ADDRESS,
    method: 'getAllsubscriptionsForOrganization',
    args: [organizationId]
  }) ?? []
  return result
}

export const useSubscriptionInfoByOrg = (account) => {
  const { library } = useEthers()
  const [products, setProducts] = useState([])

  const fetch = useCallback(
    async () => {
      const products = await fetchOwnerProducts(library, account)
      setProducts(products)
    },
    [library, account],
  )

  useEffect(() => {
    if (library) {
      async function f() {
        await fetch()
      }
      f()
    }
  }, [library, fetch])

  return { products, refetch: fetch }
}

export const useCreateProduct = function() {
  const abi = new Interface(SUBSCRIPTION_HUB_ABI)
  const contract = new Contract(ANDSUB_HUB_ADDRESS, abi)
  return useContractFunction(contract, 'createProduct', { transactionName: 'Create Product'})
}

export const useWithdrawPaymentForProduct = function() {
  const abi = new Interface(SUBSCRIPTION_HUB_ABI)
  const contract = new Contract(ANDSUB_HUB_ADDRESS, abi)
  return useContractFunction(contract, 'withdrawPaymentForProduct', { transactionName: 'Withdraw Payment'})
}
