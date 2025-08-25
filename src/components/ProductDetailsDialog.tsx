import * as React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Grid, Typography, Rating, Stack } from '@mui/material'
import { Product } from '../types'
import { useCart } from '../store/cart'
import { formatPrice } from '../utils/format'

interface Props {
  product?: Product
  open: boolean
  onClose: () => void
}

export default function ProductDetailsDialog({ product, open, onClose }: Props) {
  const addToCart = useCart(s => s.addToCart)
  if (!product) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 12 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography color="text.secondary">{product.brand} · {product.category}</Typography>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="h5" fontWeight={800}>{formatPrice(product.price)}</Typography>
              <Typography variant="body1">{product.description}</Typography>
              <Typography variant="body2" color={product.stock > 0 ? 'success.main' : 'error.main'}>
                Stok: {product.stock}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">Kapat</Button>
        <Button onClick={() => { addToCart(product, 1); onClose() }}>Sepete ekle</Button>
      </DialogActions>
    </Dialog>
  )
}
