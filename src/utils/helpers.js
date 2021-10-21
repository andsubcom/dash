export function ipfsToGateway(ipfsUri) {
  const cid = ipfsUri.substring(7)
  return `https://ipfs.io/ipfs/${cid}`
}