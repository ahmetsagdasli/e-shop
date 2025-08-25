import * as React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, InputBase, alpha, Stack, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../store/cart'

const Search = ({ onSubmit }: { onSubmit: (q: string) => void }) => {
  const [q, setQ] = React.useState('')
  return (
    <Box sx={{ position: 'relative', borderRadius: 999, bgcolor: theme => alpha(theme.palette.common.white, 0.15), '&:hover': { bgcolor: theme => alpha(theme.palette.common.white, 0.25) }, ml: 2, flex: 1, maxWidth: 560 }}>
      <Box sx={{ p: '6px', height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', pl: 1.5 }}>
        <SearchIcon />
      </Box>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(q) }}>
        <InputBase
          placeholder="Arama…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          sx={{ color: 'inherit', pl: 5, pr: 2, width: '100%' }}
        />
      </form>
    </Box>
  )
}

export default function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const navigate = useNavigate()
  const cartCount = useCart(s => s.cart.reduce((a, b) => a + b.qty, 0))
  const wishlistCount = useCart(s => s.wishlist.length)
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <>
      <AppBar position="sticky" elevation={1}>
        <Toolbar sx={{ gap: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton 
              color="inherit" 
              onClick={() => setSidebarOpen(true)}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              fontWeight={800}
              component={Link} 
              to="/" 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              E‑Shop
            </Typography>
          </Stack>
        <Search onSubmit={(q) => navigate(`/shop?search=${encodeURIComponent(q)}`)} />
        <Box sx={{ flex: 1 }} />
        <Tooltip title="Favoriler">
          <IconButton size="large" color="inherit" component={Link} to="/shop?wishlist=1">
            <Badge badgeContent={wishlistCount} color="secondary">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Sepet">
          <IconButton size="large" color="inherit" onClick={onOpenCart}>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
    
    {/* Sidebar import ve kullanımı için lazy loading */}
    {sidebarOpen && (
      <React.Suspense fallback={null}>
        {React.createElement(
          React.lazy(() => import('./Sidebar')),
          {
            open: sidebarOpen,
            onClose: () => setSidebarOpen(false)
          }
        )}
      </React.Suspense>
    )}
  </>
  )
}
