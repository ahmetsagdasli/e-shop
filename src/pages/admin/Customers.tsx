import * as React from 'react'
import {
  Container,
  Stack,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Button
} from '@mui/material'
import { MoreVert } from '@mui/icons-material'

interface Customer {
  id: string
  name: string
  email: string
  orders: number
  totalSpent: number
  status: 'active' | 'inactive'
}

const mockCustomers: Customer[] = [
  { id: 'c1', name: 'Ayşe Yılmaz', email: 'ayse@example.com', orders: 5, totalSpent: 1250, status: 'active' },
  { id: 'c2', name: 'Mehmet Demir', email: 'mehmet@example.com', orders: 2, totalSpent: 430, status: 'active' },
  { id: 'c3', name: 'Elif Kaya', email: 'elif@example.com', orders: 0, totalSpent: 0, status: 'inactive' }
]

export default function AdminCustomers() {
  const [customers] = React.useState<Customer[]>(mockCustomers)

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Müşteriler
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Kayıtlı müşteriler ve sipariş bilgileri
          </Typography>
        </Box>
        <Button variant="contained">Yeni Müşteri</Button>
      </Stack>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Müşteri</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Siparişler</TableCell>
                <TableCell align="right">Toplam Harcama</TableCell>
                <TableCell align="center">Durum</TableCell>
                <TableCell align="center">İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map(c => (
                <TableRow key={c.id}>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar>{c.name.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{c.name}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell align="center">{c.orders}</TableCell>
                  <TableCell align="right">₺{c.totalSpent.toLocaleString()}</TableCell>
                  <TableCell align="center">
                    <Chip label={c.status === 'active' ? 'Aktif' : 'Pasif'} color={c.status === 'active' ? 'success' : 'warning'} size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  )
}
