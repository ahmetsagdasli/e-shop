import * as React from 'react'
import { Box, Container, Divider, Grid, Link as MLink, Stack, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 8, py: 6, bgcolor: 'grey.100' }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={800}>E‑Shop</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Modern e‑ticaret arayüzü. React + Material UI ile inşa edildi.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack gap={1}>
              <Typography variant="subtitle1" fontWeight={700}>Bağlantılar</Typography>
              <MLink href="/shop">Mağaza</MLink>
              <MLink href="/orders">Siparişler</MLink>
              <MLink href="/checkout">Ödeme</MLink>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight={700}>Bülten</Typography>
            <Typography variant="body2" color="text.secondary">Kampanyaları kaçırmayın.</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography variant="caption" color="text.secondary">© {new Date().getFullYear()} E‑Shop. Tüm hakları saklıdır.</Typography>
      </Container>
    </Box>
  )
}
