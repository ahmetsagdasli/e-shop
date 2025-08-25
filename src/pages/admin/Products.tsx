import * as React from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  useTheme,
  alpha
} from '@mui/material'
import {
  Add,
  Edit,
  Delete,
  MoreVert,
  Visibility,
  Star,
  Inventory
} from '@mui/icons-material'
import { motion } from 'framer-motion'

const MotionCard = motion(Card)

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'active' | 'inactive' | 'outofstock'
  rating: number
  image: string
  description: string
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro 16"',
    category: 'Laptops',
    price: 21597,
    stock: 12,
    status: 'active',
    rating: 4.8,
    image: '/api/placeholder/100/100',
    description: 'Apple MacBook Pro 16" M1 Max'
  },
  {
    id: '2',
    name: 'iPhone 13 Pro',
    category: 'Phones',
    price: 3150,
    stock: 25,
    status: 'active',
    rating: 4.9,
    image: '/api/placeholder/100/100',
    description: 'Apple iPhone 13 Pro 128GB'
  },
  {
    id: '3',
    name: 'iPad Air',
    category: 'Tablets',
    price: 2250,
    stock: 0,
    status: 'outofstock',
    rating: 4.7,
    image: '/api/placeholder/100/100',
    description: 'Apple iPad Air 64GB'
  },
  {
    id: '4',
    name: 'AirPods Pro',
    category: 'Audio',
    price: 899,
    stock: 50,
    status: 'active',
    rating: 4.6,
    image: '/api/placeholder/100/100',
    description: 'Apple AirPods Pro with MagSafe'
  },
  {
    id: '5',
    name: 'Apple Watch Series 7',
    category: 'Wearables',
    price: 1299,
    stock: 8,
    status: 'inactive',
    rating: 4.5,
    image: '/api/placeholder/100/100',
    description: 'Apple Watch Series 7 45mm'
  }
]

export default function AdminProducts() {
  const theme = useTheme()
  const [products, setProducts] = React.useState<Product[]>(mockProducts)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [editMode, setEditMode] = React.useState(false)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, product: Product) => {
    setAnchorEl(event.currentTarget)
    setSelectedProduct(product)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedProduct(null)
  }

  const handleEdit = () => {
    setEditMode(true)
    setOpenDialog(true)
    handleMenuClose()
  }

  const handleAdd = () => {
    setSelectedProduct({
      id: '',
      name: '',
      category: '',
      price: 0,
      stock: 0,
      status: 'active',
      rating: 0,
      image: '',
      description: ''
    })
    setEditMode(false)
    setOpenDialog(true)
  }

  const handleDelete = () => {
    if (selectedProduct) {
      setProducts(prev => prev.filter(p => p.id !== selectedProduct.id))
    }
    handleMenuClose()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'inactive': return 'warning'
      case 'outofstock': return 'error'
      default: return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif'
      case 'inactive': return 'Pasif'
      case 'outofstock': return 'Stokta Yok'
      default: return 'Bilinmiyor'
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Ürün Yönetimi
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Mağazanızdaki ürünleri yönetin
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAdd}
          sx={{ borderRadius: 3 }}
        >
          Yeni Ürün Ekle
        </Button>
      </Stack>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Inventory sx={{ color: theme.palette.primary.main }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {products.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Toplam Ürün
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Star sx={{ color: theme.palette.success.main }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {products.filter(p => p.status === 'active').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Aktif Ürün
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Inventory sx={{ color: theme.palette.warning.main }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {products.reduce((acc, p) => acc + p.stock, 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Toplam Stok
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Inventory sx={{ color: theme.palette.error.main }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {products.filter(p => p.status === 'outofstock').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stokta Yok
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Products Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
            Ürünler
          </Typography>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ürün</TableCell>
                  <TableCell>Kategori</TableCell>
                  <TableCell align="right">Fiyat</TableCell>
                  <TableCell align="center">Stok</TableCell>
                  <TableCell align="center">Durum</TableCell>
                  <TableCell align="center">Puan</TableCell>
                  <TableCell align="center">İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                          src={product.image}
                          variant="rounded"
                          sx={{ width: 48, height: 48 }}
                        >
                          <Inventory />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {product.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {product.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip label={product.category} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={600}>
                        ₺{product.price.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography 
                        variant="body2" 
                        color={product.stock < 10 ? 'error.main' : 'text.primary'}
                        fontWeight={product.stock < 10 ? 600 : 400}
                      >
                        {product.stock}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={getStatusLabel(product.status)}
                        size="small"
                        color={getStatusColor(product.status) as any}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
                        <Star sx={{ color: 'warning.main', fontSize: 16 }} />
                        <Typography variant="body2">
                          {product.rating}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={(e) => handleMenuClick(e, product)}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {}}>
          <Visibility sx={{ mr: 2 }} />
          Görüntüle
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <Edit sx={{ mr: 2 }} />
          Düzenle
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 2 }} />
          Sil
        </MenuItem>
      </Menu>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editMode ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ürün Adı"
                value={selectedProduct?.name || ''}
                onChange={(e) => setSelectedProduct(prev => prev ? {...prev, name: e.target.value} : null)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Açıklama"
                multiline
                rows={3}
                value={selectedProduct?.description || ''}
                onChange={(e) => setSelectedProduct(prev => prev ? {...prev, description: e.target.value} : null)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Kategori</InputLabel>
                <Select
                  value={selectedProduct?.category || ''}
                  label="Kategori"
                  onChange={(e) => setSelectedProduct(prev => prev ? {...prev, category: e.target.value} : null)}
                >
                  <MenuItem value="Laptops">Laptops</MenuItem>
                  <MenuItem value="Phones">Phones</MenuItem>
                  <MenuItem value="Tablets">Tablets</MenuItem>
                  <MenuItem value="Audio">Audio</MenuItem>
                  <MenuItem value="Wearables">Wearables</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Fiyat"
                type="number"
                value={selectedProduct?.price || 0}
                onChange={(e) => setSelectedProduct(prev => prev ? {...prev, price: Number(e.target.value)} : null)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Stok"
                type="number"
                value={selectedProduct?.stock || 0}
                onChange={(e) => setSelectedProduct(prev => prev ? {...prev, stock: Number(e.target.value)} : null)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Durum</InputLabel>
                <Select
                  value={selectedProduct?.status || 'active'}
                  label="Durum"
                  onChange={(e) => setSelectedProduct(prev => prev ? {...prev, status: e.target.value as any} : null)}
                >
                  <MenuItem value="active">Aktif</MenuItem>
                  <MenuItem value="inactive">Pasif</MenuItem>
                  <MenuItem value="outofstock">Stokta Yok</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>İptal</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            {editMode ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
