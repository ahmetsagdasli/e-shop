import * as React from 'react'
import { Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemAvatar, Avatar, ListItemText, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../store/cart'
import { formatPrice } from '../utils/format'

interface Props { open: boolean; onClose: () => void }

export default function CartDrawer({ open, onClose }: Props) {
  const { cart, removeFromCart, setQty, clearCart } = useCart()
  const navigate = useNavigate()
  const total = cart.reduce((a, b) => a + b.product.price * b.qty, 0)

  return (
    <Drawer anchor="right" open={open} onClose={onClose} sx={{ '& .MuiDrawer-paper': { width: { xs: 360, md: 420 }, p: 2 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={800}>Sepet</Typography>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </Stack>
      <Divider sx={{ my: 2 }} />

      <List sx={{ flex: 1, overflow: 'auto' }}>
        {cart.map(ci => (
          <ListItem key={ci.product.id} secondaryAction={
            <Stack direction="row" alignItems="center" spacing={1}>
              <Button size="small" variant="outlined" onClick={() => setQty(ci.product.id, Math.max(0, ci.qty - 1))}>-</Button>
              <Typography>{ci.qty}</Typography>
              <Button size="small" variant="outlined" onClick={() => setQty(ci.product.id, ci.qty + 1)}>+</Button>
              <IconButton onClick={() => removeFromCart(ci.product.id)}><CloseIcon /></IconButton>
            </Stack>
          }>
            <ListItemAvatar><Avatar variant="rounded" src={ci.product.image} /></ListItemAvatar>
            <ListItemText primary={ci.product.name} secondary={`${formatPrice(ci.product.price)} · ${ci.product.brand}`} />
          </ListItem>
        ))}
        {cart.length === 0 && (
          <Box sx={{ textAlign: 'center', color: 'text.secondary', py: 6 }}>Sepetiniz boş.</Box>
        )}
      </List>

      <Divider sx={{ my: 2 }} />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={800}>Toplam</Typography>
        <Typography variant="h6">{formatPrice(total)}</Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button fullWidth variant="outlined" onClick={() => clearCart()}>Temizle</Button>
        <Button fullWidth onClick={() => { onClose(); navigate('/checkout') }}>Ödemeye geç</Button>
      </Stack>
    </Drawer>
  )
}
