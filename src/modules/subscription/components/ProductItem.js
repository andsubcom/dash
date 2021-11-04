import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { prop } from 'styled-tools'
import { useTheme } from '@emotion/react'

import { Flex, HStack, Box, useDisclosure } from '@chakra-ui/react'
import { ipfsToGateway } from 'utils/helpers'
import WithdrawModal from './WithdrawModal'

function ProductItem({ product }) {
  const theme = useTheme()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [metadata, setMetadata] = useState()

  const metadataUrl = ipfsToGateway(product.metadataUri || '')
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
    <Element>
      
      <HStack spacing="40px">
        <Cell w="104">
          <ImageContainer background={`url('${imageUrl}') #C4C4C4`} />
        </Cell>
        <Cell w="190px">
          <Box>
            <Slug href={`https://checkout.andsub.com/${product.id}`} target="_blank">{product.id}</Slug>
            <Bold>{product.name}</Bold>
          </Box>
        </Cell>
        <Cell w="150px">
          <Box>
            <Label>Price</Label>
            <Bold>{product.price} <A href="#" target="_blank">{product?.token?.symbol}</A></Bold>
          </Box>
        </Cell>
        <Cell w="170px">
          <Box>
            <Label>Total Revenue</Label>
            <Bold>324 {product?.token?.symbol} <Link to={`/product/${product.id}`}>Claim</Link></Bold>
          </Box>
        </Cell>
        <Cell w="132px">
          <Box>
            <Label>Frequency</Label>
            <Bold>{product.period}</Bold>
          </Box>
        </Cell>
        <Cell w="40px">
          <Dots src='/dots.png' />
        </Cell>
      </HStack>
      <WithdrawModal isOpen={isOpen} onClose={onClose} product={product} />
    </Element>
  )
}

const Element = styled(Flex)`
  width: 100%;
  height: 120px;
  background: #FFFFFF;
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  padding: 8px;
`

const Cell = styled(Flex)`
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const ImageContainer = styled(Box)`
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  width: 104px;
  height: 102px;
  border: 1px solid #F1F3F6;
  box-sizing: border-box;
  border-radius: 8px;
`

const Slug = styled.a`
  display: flex;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  color: ${prop('theme.colors.primary')};
  margin-bottom: 8px;
`

const Bold = styled(Box)`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #081343;
`

const Label = styled(Box)`
  color: #9CA1B4;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;
`

const A = styled.a`
  cursor: pointer;
  color: ${prop('theme.colors.primary')};
  font-weight: normal;
`

const Dots = styled.img`
  width: 40px;
  height: 40px;
`

ProductItem.propTypes = {

}

export default ProductItem

