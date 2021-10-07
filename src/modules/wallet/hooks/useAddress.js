import { useCallback, useState } from "react"

const LOCAL_STARAGE_ADDRESS_KEY = "ls-address-key"
const setLocalStorageAddress = (address) => {
  if (address) {
    localStorage[LOCAL_STARAGE_ADDRESS_KEY] = address
  }
}

const getLocalStorageAddress = () =>
  localStorage[LOCAL_STARAGE_ADDRESS_KEY] || null

const useAddress = () => {
  const [address, setAddress] = useState(getLocalStorageAddress())

  const setAddressCallback = useCallback((address) => {
    setAddress(address || "")
    setLocalStorageAddress(address || "")
  }, [])

  return [address, setAddressCallback]
}

export default useAddress
