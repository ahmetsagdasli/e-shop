import * as React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Chip, IconButton, Rating, Stack, Typography, Tooltip } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { Product } from '../types'
import { useCart } from '../store/cart'
import { formatPrice } from '../utils/format'

interface Props {
  product: Product
  onOpen: (p: Product) => void
}

export default function ProductCard({ product, onOpen }: Props) {
  const addToCart = useCart(s => s.addToCart)
  const wishlist = useCart(s => s.wishlist)
  const addToWishlist = useCart(s => s.addToWishlist)
  const removeFromWishlist = useCart(s => s.removeFromWishlist)
  const liked = wishlist.some(w => w.id === product.id)

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={() => onOpen(product)}>
        <CardMedia component="img" height={220} image={product.image} alt={product.name} />
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="start" spacing={2}>
            <Stack spacing={0.5}>
              <Typography variant="subtitle1" fontWeight={700}>{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">{product.brand}</Typography>
              <Rating value={product.rating} precision={0.1} readOnly size="small" sx={{ mt: 0.5 }} />
              <Typography variant="h6" sx={{ mt: 1 }}>{formatPrice(product.price)}</Typography>
            </Stack>
            <Stack alignItems="end" spacing={1}>
              <Chip size="small" label={product.category} />
              <Tooltip title={liked ? 'Favorilerden çıkar' : 'Favorilere ekle'}>
                <IconButton onClick={(e) => { e.stopPropagation(); liked ? removeFromWishlist(product.id) : addToWishlist(product) }}>
                  {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Sepete ekle">
                <IconButton onClick={(e) => { e.stopPropagation(); addToCart(product, 1) }}>
                  <AddShoppingCartIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
