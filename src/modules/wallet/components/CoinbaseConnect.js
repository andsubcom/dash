import React from 'react'
import { Button, Box, Text } from "@chakra-ui/react"
import { useEthers } from "@usedapp/core"
import Identicon from "./Identicon"

export default function CoinbaseConnect({ handleOpenModal, buttonOnly }) {
  const { activateBrowserWallet, account } = useEthers()

  function handleConnectWallet() {
    activateBrowserWallet()
  }

  const renderConnectButton = () => {
    return (
      <Box
        display="flex"
        alignItems="center"
        background="#fff"
        borderRadius="4px"
        boxShadow='0px 18px 32px rgba(208, 210, 218, 0.20)'
        py="0"
      >
        <Button
          onClick={handleConnectWallet}
          bg="#000"
          color="#fff"
          fontSize="lg"
          fontWeight="medium"
          borderRadius="4px"
          size="lg"
          border="1px solid transparent"
          _hover={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "#1e1e1e",
            backgroundColor: "#1e1e1e",
          }}
        >
          Connect to Coinbase Wallet
        </Button>
      </Box>
    )
  }

  if (buttonOnly) {
    return renderConnectButton()
  }

  return account ? (
    <Box
      display="flex"
      alignItems="center"
      background="#fff"
      borderRadius="4px"
      boxShadow='0px 18px 32px rgba(208, 210, 218, 0.20)'
      py="0"
    >
      {/* <Box px="3">
        <Text color="#15192C" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
        </Text>
      </Box> */}
      <Button
        onClick={handleOpenModal}
        bg="#eaecfc"
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "blue.400",
          backgroundColor: "#eaecfc",
        }}
        borderRadius="4px"
        m="1px"
        px={3}
        height="38px"
      >
        <Text color="#15192C" fontSize="md" fontWeight="medium" mr="2">
          {account &&
            `${account.slice(0, 12)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </Text>
        <Identicon />
      </Button>
    </Box>
  ) : (
    renderConnectButton()
  )
}
