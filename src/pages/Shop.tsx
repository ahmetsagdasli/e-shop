import * as React from 'react'
import { Container } from '@mui/material'
import ProductGrid from '../components/ProductGrid'

export default function Shop() {
  return (
    <Container sx={{ py: 4 }}>
      <ProductGrid />
    </Container>
  )
}
