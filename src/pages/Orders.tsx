import * as React from 'react'
import { Container, Paper, Stack, Typography } from '@mui/material'

export default function Orders() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>Siparişler</Typography>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={1}>
          <Typography variant="body1">Örnek sipariş listesi (mock):</Typography>
          <Typography variant="body2" color="text.secondary">Henüz sipariş bulunmuyor.</Typography>
        </Stack>
      </Paper>
    </Container>
  )
}
