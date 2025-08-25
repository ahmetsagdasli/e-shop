import * as React from 'react'
import { Box, Grid, MenuItem, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, Slider, CircularProgress, Alert } from '@mui/material'
import debounce from 'lodash.debounce'
import { products as fallbackProducts } from '../data/products'
import type { Product } from '../types'
import type { Category as CategoryType } from '../pages/admin/Categories'
import { apiService } from '../services/api'
import ProductCard from './ProductCard'
import ProductDetailsDialog from './ProductDetailsDialog'
import { useSearchParams } from 'react-router-dom'

const defaultCategories: string[] = ['Electronics', 'Fashion', 'Home', 'Sports', 'Beauty']

export default function ProductGrid() {
  const [params, setParams] = useSearchParams()
  const wishlistParam = params.get('wishlist')

  const [search, setSearch] = React.useState(params.get('search') ?? '')
  const [category, setCategory] = React.useState<string | 'All'>(
    (params.get('category') as string) || 'All'
  )
  const [price, setPrice] = React.useState<number[]>([0, 7000])
  const [sort, setSort] = React.useState<'popular' | 'price-asc' | 'price-desc'>('popular')
  const [selected, setSelected] = React.useState<Product | undefined>()
  const [products, setProducts] = React.useState<Product[]>([])
  const [categories, setCategories] = React.useState<string[]>(defaultCategories)
  const [pagination, setPagination] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  // Fetch products from API
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await apiService.getProducts({
          search,
          category: category === 'All' ? '' : category,
          minPrice: price[0],
          maxPrice: price[1],
          sortBy: sort.split('-')[0],
          sortOrder: sort.includes('desc') ? 'desc' : 'asc'
        })
        if (response.success && response.data) {
          setProducts(response.data)
          setPagination(response.pagination)
        } else {
          // Fallback to static data if API fails
          setProducts(fallbackProducts)
          setError(response.message || 'API failed, using fallback data.')
          console.warn('API failed, using fallback data:', response.error)
        }
      } catch (err) {
        // Fallback to static data if API fails
        setProducts(fallbackProducts)
        setError('Failed to load products from server, using cached data')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [search, category, price, sort])

  // Fetch categories for filter toggles
  React.useEffect(() => {
    let mounted = true
    const fetchCats = async () => {
      try {
        const res = await apiService.getCategories()
        if (!mounted) return
        if (res.success && Array.isArray(res.data)) {
          setCategories(res.data.map((c: any) => c.name))
        } else {
          setCategories(defaultCategories)
        }
      } catch (err) {
        setCategories(defaultCategories)
        console.error('Failed to load categories', err)
      }
    }
    fetchCats()
    return () => { mounted = false }
  }, [])

  const updateQS = React.useMemo(() => debounce((s: string, c: string) => {
    const p = new URLSearchParams(params)
    s ? p.set('search', s) : p.delete('search')
    c !== 'All' ? p.set('category', c) : p.delete('category')
    setParams(p)
  }, 300), [params, setParams])

  React.useEffect(() => { updateQS(search, String(category)) }, [search, category])

  const productList = wishlistParam ? products.filter(p => {
    try { const state = JSON.parse(localStorage.getItem('ecom-state-v1') || '{}');
      return state?.wishlist?.some((w: Product) => w.id === p.id)
    } catch { return false }
  }) : products

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress size={60} />
      </Box>
    )
  }

  return (
    <Box>
      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }} justifyContent="space-between" sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <Typography variant="h6" fontWeight={800}>Ürünler</Typography>
          <ToggleButtonGroup value={category} exclusive onChange={(_, v) => v && setCategory(v)} size="small">
            <ToggleButton value="All">Tümü</ToggleButton>
            {categories.map((c: string) => <ToggleButton key={c} value={c}>{c}</ToggleButton>)}
          </ToggleButtonGroup>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 260 }}>
            <Typography variant="body2" color="text.secondary">Fiyat:</Typography>
            <Slider value={price} onChange={(_, v) => setPrice(v as number[])} valueLabelDisplay="auto" min={0} max={7000} step={50} sx={{ width: 180 }} />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField size="small" placeholder="Ara" value={search} onChange={e => setSearch(e.target.value)} />
          <Select size="small" value={sort} onChange={e => setSort(e.target.value as any)}>
            <MenuItem value="popular">Popüler</MenuItem>
            <MenuItem value="price-asc">Fiyat ↑</MenuItem>
            <MenuItem value="price-desc">Fiyat ↓</MenuItem>
          </Select>
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        {productList.map(p => (
          <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={p} onOpen={setSelected} />
          </Grid>
        ))}
      </Grid>

      <ProductDetailsDialog product={selected} open={Boolean(selected)} onClose={() => setSelected(undefined)} />
    </Box>
  )
}
