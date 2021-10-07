import { mergeList, useSubscription } from "defi-sdk"
import { useCallback, useMemo } from "react"

const useHistory = (address) => {
  return useSubscription({
    namespace: "address",
    mergeStrategy: mergeList,
    getId: useCallback((item) => item.hash, []),
    body: useMemo(() => {
      const payload = {
        address,
        currency: "USD",
      }
      return {
        scope: ["transactions"],
        payload,
      }
    }, [address]),
  })
}

export default useHistory
