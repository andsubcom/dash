import React from 'react'
import { Button, Box, Text } from "@chakra-ui/react"
import { useEthers } from "@usedapp/core"
import Identicon from "./Identicon"

export default function ConnectButton({ handleOpenModal, buttonOnly }) {
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
          Connect to a wallet
        </Button>
      </Box>
    )
  }

  if(buttonOnly) {
    return renderConnectButton()
  }

  return account ? (
    <Box
      display="flex"
      alignItems="center"
      py="0"
    >
      {/* <Box px="3">
        <Text color="#15192C" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
        </Text>
      </Box> */}
      <Button
        onClick={handleOpenModal}
        bg="#081343"
        boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)"
        padding="12px 22px"
        height="56px"
        borderRadius="56px"
        border="1px solid transparent"
        _active={{
          bg: "#081343",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)"
        }}
        _hover={{
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)"
        }}
        m="1px"
        px={3}
      >
        <Identicon />
        <Text color="#fff" fontSize="md" fontWeight="medium" ml="2">
          {account &&
            `${account.slice(0, 12)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </Text>
      </Button>
    </Box>
  ) : (
    renderConnectButton()
  )
}
