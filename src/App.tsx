import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Analytics from './pages/Analytics'
import AdminProducts from './pages/admin/Products'
import AdminCustomers from './pages/admin/Customers'
import AdminCategories from './pages/admin/Categories'
import Chat from './pages/Chat'
import Calendar from './pages/Calendar'
import CartDrawer from './components/CartDrawer'

export default function App() {
  const [openCart, setOpenCart] = React.useState(false)

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <Header onOpenCart={() => setOpenCart(true)} />
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </Box>
      <Footer />
      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </Box>
  )
}
