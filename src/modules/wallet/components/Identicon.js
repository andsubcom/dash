import React, { useEffect, useRef } from "react"
import { useEthers } from "@usedapp/core"
import Jazzicon from "@metamask/jazzicon"
import styled from "@emotion/styled"

export default function Identicon() {
  const ref = useRef()
  const { account } = useEthers();

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(Jazzicon(24, parseInt(account.slice(2, 10), 16)));
    }
  }, [account]);

  return <StyledIdenticon ref={ref} />;
}

const StyledIdenticon = styled.div`
  height: 1.6rem;
  width: 1.6rem;
  border-radius: 2.125rem;
  background-color: transparent;
`

