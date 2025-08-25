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
  Chip,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { apiService } from '../../services/api'

interface Category {
  id: string
  name: string
  products: number
  status: 'active' | 'inactive'
}

const mockCategories: Category[] = [
  { id: 'cat1', name: 'Laptops', products: 12, status: 'active' },
  { id: 'cat2', name: 'Phones', products: 24, status: 'active' },
  { id: 'cat3', name: 'Audio', products: 8, status: 'inactive' }
]

export default function AdminCategories() {
  const [categories, setCategories] = React.useState<Category[]>(mockCategories)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selected, setSelected] = React.useState<Category | null>(null)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [editMode, setEditMode] = React.useState(false)
  const [nameField, setNameField] = React.useState('')
  const navigate = useNavigate()

  React.useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await apiService.getCategories()
        if (!mounted) return
        if (res.success && Array.isArray(res.data)) {
          const mapped = res.data.map((c: any) => {
            const id = c._id || c.id || c._id
            const name = c.name || c.title || 'Unnamed'
            const products = (typeof c.productCount === 'number') ? c.productCount : (typeof c.products === 'number' ? c.products : 0)
            const status = (typeof c.isActive === 'boolean') ? (c.isActive ? 'active' : 'inactive') : (c.status === 'active' ? 'active' : 'inactive')
            return { id, name, products, status }
          })
          setCategories(mapped)
        } else {
          // Unexpected response shape - keep existing mock categories
          console.warn('Unexpected categories response, using local mock data', res)
        }
      } catch (err) {
        console.error('Failed to load categories', err)
        // Fallback to mock categories when backend/database unavailable
        setCategories(mockCategories)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  const handleMenuClick = (e: React.MouseEvent<HTMLElement>, c: Category) => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
    setSelected(c)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleView = (c: Category) => {
    setSelected(c)
    setNameField(c.name)
    setEditMode(false)
    setOpenDialog(true)
    handleMenuClose()
  }

  const handleEdit = () => {
    if (!selected) return
    setNameField(selected.name)
    setEditMode(true)
    setOpenDialog(true)
    handleMenuClose()
  }

  const handleSave = async () => {
    try {
      if (selected) {
        const res = await apiService.updateCategory(selected.id, { name: nameField })
        if (res.success && res.data) {
          setCategories(prev => prev.map(p => p.id === selected.id ? { ...p, name: res.data.name } : p))
        }
      } else {
        const res = await apiService.createCategory({ name: nameField })
        if (res.success && res.data) {
          // New category returns DB object with _id
          const created = { id: res.data._id || res.data.id || `cat_${Date.now()}`, name: res.data.name, products: res.data.productCount || 0, status: res.data.isActive ? 'active' : 'inactive' }
          setCategories(prev => [created, ...prev])
        }
      }
    } catch (err) {
      console.error('Category save failed', err)
    } finally {
      setOpenDialog(false)
      setSelected(null)
      setNameField('')
    }
  }

  const handleDelete = async () => {
    if (!selected) return
    try {
      const res = await apiService.deleteCategory(selected.id)
      if (res.success) {
        setCategories(prev => prev.filter(p => p.id !== selected.id))
      }
    } catch (err) {
      console.error('Delete failed', err)
    } finally {
      handleMenuClose()
      setSelected(null)
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Kategoriler
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Mağazanızdaki kategori yönetimi
          </Typography>
        </Box>
        <Button variant="contained" onClick={() => { setSelected(null); setNameField(''); setEditMode(true); setOpenDialog(true); }}>Yeni Kategori</Button>
      </Stack>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Kategori</TableCell>
                <TableCell align="center">Ürün Sayısı</TableCell>
                <TableCell align="center">Durum</TableCell>
                <TableCell align="center">İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map(c => (
                <TableRow
                  key={c.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleView(c)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{ cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' }}
                      onClick={() => navigate(`/shop?category=${encodeURIComponent(c.name)}`)}
                    >
                      {c.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{c.products}</TableCell>
                  <TableCell align="center">
                    <Chip label={c.status === 'active' ? 'Aktif' : 'Pasif'} color={c.status === 'active' ? 'success' : 'warning'} size="small" />
                  </TableCell>
                  <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                    <IconButton onClick={(e) => handleMenuClick(e, c)}>
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => selected && handleView(selected)}>Görüntüle</MenuItem>
        <MenuItem onClick={handleEdit}>Düzenle</MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>Sil</MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selected ? (editMode ? 'Kategori Düzenle' : 'Kategori') : 'Yeni Kategori'}</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Kategori Adı" value={nameField} onChange={(e) => setNameField(e.target.value)} sx={{ mt: 1 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Kapat</Button>
          {editMode ? (
            <Button variant="contained" onClick={handleSave}>Kaydet</Button>
          ) : selected ? (
            <Button variant="contained" onClick={() => { setEditMode(true) }}>Düzenle</Button>
          ) : (
            <Button variant="contained" onClick={handleSave}>Oluştur</Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  )
}
