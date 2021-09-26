import React from 'react'
import { client } from "defi-sdk"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "./theme"
import "@fontsource/inter"
import { DAppProvider } from "@usedapp/core"

import "./App.css"

import Router from './router'

client.configure({
  url: process.env.REACT_APP_ZERION_ENDPOINT,
  apiToken: process.env.REACT_APP_ZERION_API_TOKEN,
  hooks: {
    willSendRequest: request => {
      return request
    },
  },
})
Object.assign(window, { client })

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <DAppProvider config={{}}>
        <Router />
      </DAppProvider>
    </ChakraProvider>
  )
}

export default App
