import * as React from 'react'
import { Box, Button, Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import { useCart } from '../store/cart'
import { formatPrice } from '../utils/format'

export default function Checkout() {
  const { cart, clearCart } = useCart()
  const total = cart.reduce((a, b) => a + b.product.price * b.qty, 0)

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={800} sx={{ mb: 3 }}>Ödeme</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight={700}>Teslimat Bilgileri</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Ad" /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Soyad" /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Adres" /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Şehir" /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Posta Kodu" /></Grid>
              </Grid>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 1 }}>Ödeme Bilgileri</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}><TextField fullWidth label="Kart Üzerindeki İsim" /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Kart Numarası" /></Grid>
                <Grid item xs={6}><TextField fullWidth label="SKT (AA/YY)" /></Grid>
                <Grid item xs={6}><TextField fullWidth label="CVC" /></Grid>
              </Grid>
              <Button onClick={clearCart}>Siparişi Tamamla</Button>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="subtitle1" fontWeight={700}>Sipariş Özeti</Typography>
            <Box sx={{ mt: 2 }}>
              {cart.map(ci => (
                <Stack key={ci.product.id} direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="body2">{ci.product.name} × {ci.qty}</Typography>
                  <Typography variant="body2">{formatPrice(ci.product.price * ci.qty)}</Typography>
                </Stack>
              ))}
              <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
                <Typography variant="subtitle1" fontWeight={800}>Toplam</Typography>
                <Typography variant="h6">{formatPrice(total)}</Typography>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
