import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { prop } from 'styled-tools'

import { Flex, Box } from '@chakra-ui/react'
import { PaperUpload } from 'react-iconly'

function NFTUpload({ onChange, ...props }) {
  const theme = useTheme()
  return (
    <Flex 
      justifyContent='center' 
      alignItems='center' 
      position='relative'
      minWidth={'150px'}
      minHeight={'170px'}
      {...props}>
      <input
        style={{display: 'none'}}
        type='file'
        id='nftImage'
        name='nftImage'
        onChange={onChange}
        accept='.jpg,.jpeg,.png,.svg'
      />
      <ImagePlaceholder>
        <Flex flexDirection='row' fontSize='14px' alignItems='center' justifyContent='center'>
          <PaperUpload set="light" primaryColor={theme.colors.primary}/>
          {' '} Upload Image
        </Flex>
      </ImagePlaceholder>
      {/* <ImagePreview src='https://ipfs.io/ipfs/QmS6DT485Um7Ps5sChSkV2ksUjzV14cKeDssPDSMGE4eon' /> */}
    </Flex>
  )
}

const ImagePlaceholder = styled.div`
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 170px;
  /* border: 1px solid ${prop('theme.colors.primary')}; */
  border-radius: 8px;
  border: 1px solid rgb(226, 232, 240);
  /* box-shadow: 2px 3px 20px #00000012; */
  cursor: pointer;
  color: ${prop('theme.colors.primary')};

  &:hover {
    border: 1px solid ${prop('theme.colors.primary')};
  }
`

const ImagePreview = styled.img`
  max-width: 150px;
  max-height: 170px;
  border-radius: 8px;
  box-shadow: 2px 3px 20px #00000012;
`

NFTUpload.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default NFTUpload

