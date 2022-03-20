import React, { useState, useEffect } from 'react'
import { Flex, Image, Button } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { PageWrapper } from 'modules/layout'
import { ConnectButton } from 'modules/wallet'
import CoinbaseConnect from 'modules/wallet/components/CoinbaseConnect'
import Web3Modal from "web3modal";
import { providerOptions } from 'modules/wallet/components/ProviderOptions'
import { ethers } from 'ethers'
import { toHex, truncateAddress } from 'modules/wallet/components/Utils'
import { networkParams } from "modules/wallet/components/networks";


import { useEthers } from "@usedapp/core"

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});

function LoginPage(props) {
  const { activateBrowserWallet, _ } = useEthers()

  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);

      await activateBrowserWallet()
    } catch (error) {
      setError(error);
    }
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]]
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account]
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature]
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      //connectWallet();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return (
    <PageWrapper
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        mt={-182}
      >
        <Flex flexDirection='row' alignItems='center' justifyContent='center' ml='-12px' mt='38px' mb='62px'>
          <Image
            // marginLeft='6px'
            // marginRight='18px'
            width="300px"
            height="91px"
            src="/logo-text-black.png"
          />
        </Flex>
        {!account ? (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        ) : (
          <Button onClick={disconnect}>Disconnect</Button>
        )}

      </Flex>
    </PageWrapper>
  )
}

const LogoText = styled.span`
  font-size: 42px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: .86px;
  color: #000;
`

LoginPage.propTypes = {

}

export default LoginPage
