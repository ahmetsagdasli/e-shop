import * as React from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Chip,
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  alpha,
  CircularProgress,
  Alert
} from '@mui/material'
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  People,
  AttachMoney,
  Inventory,
  MoreVert
} from '@mui/icons-material'
import { apiService } from '../services/api'

interface AnalyticsData {
  totalRevenue: number
  totalOrders: number
  totalUsers: number
  totalProducts: number
  revenueChange: number
  ordersChange: number
  usersChange: number
  productsChange: number
  topProducts?: Array<{ name: string; sales: number; revenue: string; change: number }>
  recentOrders?: Array<{ id: string; customer: string; product: string; amount: string; status: string }>
}

const StatCard = ({ title, value, change, changeType, icon, color }: any) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="text.secondary" variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5 }}>
              {value}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
              {changeType === 'up' ? (
                <TrendingUp sx={{ color: 'success.main', fontSize: 18 }} />
              ) : (
                <TrendingDown sx={{ color: 'error.main', fontSize: 18 }} />
              )}
              <Typography variant="body2" color={changeType === 'up' ? 'success.main' : 'error.main'} fontWeight={600}>
                {change}
              </Typography>
            </Stack>
          </Box>
          <Avatar sx={{ bgcolor: (theme: any) => alpha(color, 0.12), color, width: 48, height: 48 }}>{icon}</Avatar>
        </Stack>
      </CardContent>
    </Card>
  )
}

const fallbackTopProducts = [
  { name: 'MacBook Pro', sales: 142, revenue: '₺305,724', change: 12.5 },
  { name: 'iPhone 14', sales: 98, revenue: '₺98,000', change: 8.2 },
  { name: 'iPad Air', sales: 76, revenue: '₺171,000', change: -2.4 }
]

const fallbackRecentOrders = [
  { id: '#12345', customer: 'Ahmet Yılmaz', product: 'MacBook Pro', amount: '₺21,597', status: 'Tamamlandı' },
  { id: '#12346', customer: 'Ayşe Demir', product: 'iPhone XS Max', amount: '₺3,150', status: 'İşleniyor' },
  { id: '#12347', customer: 'Mehmet Kaya', product: 'iPad Air', amount: '₺2,250', status: 'Beklemede' }
]

const statusColor = (s: string) => {
  switch (s) {
    case 'Tamamlandı':
      return 'success'
    case 'İşleniyor':
      return 'warning'
    case 'Beklemede':
      return 'info'
    case 'İptal':
      return 'error'
    default:
      return undefined
  }
}

export default function Analytics() {
  const theme = useTheme()
  const [data, setData] = React.useState<AnalyticsData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await apiService.getAnalytics()
        if (!mounted) return
        if (res.success && res.data) {
          setData(res.data as AnalyticsData)
        } else {
          setData({
            totalRevenue: 847200,
            totalOrders: 2847,
            totalUsers: 1234,
            totalProducts: 456,
            revenueChange: 12.4,
            ordersChange: 8.2,
            usersChange: 5.7,
            productsChange: 2.1,
            topProducts: fallbackTopProducts,
            recentOrders: fallbackRecentOrders
          })
          setError(res.message || 'Demo data loaded')
        }
      } catch (err) {
        setData({
          totalRevenue: 847200,
          totalOrders: 2847,
          totalUsers: 1234,
          totalProducts: 456,
          revenueChange: 12.4,
          ordersChange: 8.2,
          usersChange: 5.7,
          productsChange: 2.1,
          topProducts: fallbackTopProducts,
          recentOrders: fallbackRecentOrders
        })
        setError('API unavailable — demo data loaded')
        console.error(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchData()
    return () => { mounted = false }
  }, [])

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
          <CircularProgress size={56} />
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 4 }}>
        Analytics Dashboard
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Toplam Satış"
            value={`₺${(data?.totalRevenue ?? 0).toLocaleString()}`}
            change={`${data?.revenueChange ?? 0}%`}
            changeType={(data?.revenueChange ?? 0) >= 0 ? 'up' : 'down'}
            icon={<AttachMoney />}
            color={theme.palette.success.main}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Siparişler"
            value={(data?.totalOrders ?? 0).toLocaleString()}
            change={`${data?.ordersChange ?? 0}%`}
            changeType={(data?.ordersChange ?? 0) >= 0 ? 'up' : 'down'}
            icon={<ShoppingCart />}
            color={theme.palette.primary.main}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Müşteriler"
            value={(data?.totalUsers ?? 0).toLocaleString()}
            change={`${data?.usersChange ?? 0}%`}
            changeType={(data?.usersChange ?? 0) >= 0 ? 'up' : 'down'}
            icon={<People />}
            color={theme.palette.info.main}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Ürünler"
            value={(data?.totalProducts ?? 0).toLocaleString()}
            change={`${data?.productsChange ?? 0}%`}
            changeType={(data?.productsChange ?? 0) >= 0 ? 'up' : 'down'}
            icon={<Inventory />}
            color={theme.palette.warning.main}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                En Çok Satan Ürünler
              </Typography>
              <Stack spacing={2}>
                {(data?.topProducts ?? fallbackTopProducts).map((p, i) => (
                  <Box key={i}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body1" fontWeight={600}>{p.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{p.sales} satış</Typography>
                      </Box>
                      <Box textAlign="right">
                        <Typography variant="body2" fontWeight={700}>{p.revenue}</Typography>
                        <Typography variant="caption" color={p.change >= 0 ? 'success.main' : 'error.main'}>
                          {p.change >= 0 ? '+' : ''}{p.change}%
                        </Typography>
                      </Box>
                    </Stack>
                    <LinearProgress variant="determinate" value={Math.min(100, (p.sales / 200) * 100)} sx={{ mt: 1, height: 8, borderRadius: 2 }} />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight={700}>Son Siparişler</Typography>
                <IconButton size="small"><MoreVert /></IconButton>
              </Stack>

              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Sipariş</TableCell>
                      <TableCell>Müşteri</TableCell>
                      <TableCell>Tutar</TableCell>
                      <TableCell>Durum</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(data?.recentOrders ?? fallbackRecentOrders).map((o) => (
                      <TableRow key={o.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight={700}>{o.id}</Typography>
                          <Typography variant="caption" color="text.secondary">{o.product}</Typography>
                        </TableCell>
                        <TableCell>{o.customer}</TableCell>
                        <TableCell><Typography fontWeight={700}>{o.amount}</Typography></TableCell>
                        <TableCell>
                          <Chip label={o.status} size="small" color={statusColor(o.status) as any} variant="outlined" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
