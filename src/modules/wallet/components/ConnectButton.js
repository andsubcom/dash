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
        borderRadius="xl"
        boxShadow='0px 18px 32px rgba(208, 210, 218, 0.20)'
        py="0"
      >
        <Button
          onClick={handleConnectWallet}
          bg="main.400"
          color="#fff" 
          fontSize="md" 
          fontWeight="medium"
          borderRadius="xl"
          border="1px solid transparent"
          _hover={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "main.300",
            backgroundColor: "main.300",
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
      background="#fff"
      borderRadius="xl"
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
        borderRadius="xl"
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
