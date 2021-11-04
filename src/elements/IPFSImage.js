import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { ipfsToGateway } from 'utils/helpers'

function IPFSImage({IPFSUrl, ...props}) {
  const [metadata, setMetadata] = useState()

  const metadataUrl = ipfsToGateway(IPFSUrl || '')
  const imageUrl = metadata ? ipfsToGateway(metadata.image) : undefined

  useEffect(() => {
    fetch(metadataUrl)
      .then(res => res.json())
      .then(
          (metadata) => {
            setMetadata(metadata)
          },
          (error) => {
            // setError(error)
          }
      )
  }, [metadataUrl])


  return (
    <Element
      width='104px'
      height='102px'
      border='1px solid #F1F3F6'
      borderRadius='8px'
      background={`url('${imageUrl}') #C4C4C4`}
    {...props}
    >
      
    </Element>
  )
}

const Element = styled(Box)`
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  box-sizing: border-box;
`

IPFSImage.propTypes = {

}

export default IPFSImage

