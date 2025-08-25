import * as React from 'react'
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import HeroSection from '../components/HeroSection'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Featured */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>Öne çıkanlar</Typography>
        <ProductGrid />
      </Container>

      {/* Banner */}
      <Container sx={{ my: 6 }}>
        <Paper sx={{ p: 4, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h6" fontWeight={800}>Kargo bedava • 500₺ üzeri siparişlerde</Typography>
          <Button component={Link} to="/shop" variant="contained">Keşfet</Button>
        </Paper>
      </Container>
    </>
  )
}
