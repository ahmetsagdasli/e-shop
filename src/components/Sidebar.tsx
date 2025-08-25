import * as React from 'react'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Collapse,
  IconButton,
  Chip,
  Stack,
  alpha,
  useTheme
} from '@mui/material'
import {
  Dashboard,
  ShoppingCart,
  Inventory,
  People,
  Analytics,
  Settings,
  Support,
  School,
  Assignment,
  ExpandLess,
  ExpandMore,
  Home,
  Store,
  Receipt,
  FavoriteRounded,
  TrendingUp,
  PersonAdd,
  LocalShipping,
  Payment,
  Description,
  Email,
  EventNote,
  Chat,
  Help,
  Category,
  ViewModule,
  Timeline,
  BarChart,
  PieChart,
  Assessment,
  TableChart
} from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const MotionBox = motion(Box)
const MotionListItem = motion(ListItem)

interface SidebarProps {
  open: boolean
  onClose: () => void
  variant?: 'temporary' | 'permanent'
}

interface MenuItem {
  title: string
  icon: React.ReactNode
  path?: string
  badge?: string | number
  isNew?: boolean
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: <Dashboard />,
    children: [
      { title: 'Ana Sayfa', icon: <Home />, path: '/' },
      { title: 'Analytics', icon: <Analytics />, path: '/analytics' },
      { title: 'Raporlar', icon: <Assessment />, path: '/reports' }
    ]
  },
  {
    title: 'E Commerce',
    icon: <ShoppingCart />,
    children: [
      { title: 'Ürünler', icon: <Inventory />, path: '/admin/products' },
      { title: 'Siparişler', icon: <Receipt />, path: '/orders' },
      { title: 'Müşteriler', icon: <People />, path: '/admin/customers' },
      { title: 'Kategoriler', icon: <Category />, path: '/admin/categories' },
      { title: 'Sepet', icon: <ShoppingCart />, path: '/cart', badge: '3' },
      { title: 'Kargo', icon: <LocalShipping />, path: '/admin/shipping' },
      { title: 'Ödeme', icon: <Payment />, path: '/admin/billing' },
      { title: 'Faturalar', icon: <Description />, path: '/admin/invoice' }
    ]
  },
  {
    title: 'CRM',
    icon: <People />,
    children: [
      { title: 'Müşteri Detayları', icon: <PersonAdd />, path: '/admin/customer-details' },
      { title: 'Müşteri Ekle', icon: <PersonAdd />, path: '/admin/add-customer' }
    ]
  },
  {
    title: 'E Learning',
    icon: <School />,
    isNew: true,
    children: [
      { title: 'Kurslar', icon: <School />, path: '/admin/courses' },
      { title: 'Öğrenciler', icon: <People />, path: '/admin/students' }
    ]
  },
  {
    title: 'LMS',
    icon: <Assignment />,
    badge: 'New',
    children: [
      { title: 'Dersler', icon: <School />, path: '/admin/lessons' },
      { title: 'Ödevler', icon: <Assignment />, path: '/admin/assignments' }
    ]
  },
  {
    title: 'Management',
    icon: <Settings />,
    children: [
      { title: 'Ayarlar', icon: <Settings />, path: '/admin/settings' },
      { title: 'Kullanıcılar', icon: <People />, path: '/admin/users' }
    ]
  },
  {
    title: 'SaaS',
    icon: <ViewModule />,
    children: [
      { title: 'Modüller', icon: <ViewModule />, path: '/admin/modules' },
      { title: 'Abonelikler', icon: <Payment />, path: '/admin/subscriptions' }
    ]
  },
  {
    title: 'Support desk',
    icon: <Support />,
    children: [
      { title: 'Destek Talepleri', icon: <Help />, path: '/admin/support-tickets' },
      { title: 'SSS', icon: <Help />, path: '/admin/faq' }
    ]
  }
]

const appSections = [
  { title: 'Takvim', icon: <EventNote />, path: '/calendar' },
  { title: 'Sohbet', icon: <Chat />, path: '/chat' },
  { title: 'Email', icon: <Email />, path: '/email' }
]

const pagesSections = [
  { title: 'Başlangıç', icon: <Home />, path: '/starter' },
  { title: 'İniş Sayfası', icon: <Timeline />, path: '/landing' }
]

const modulesSections = [
  { title: 'Formlar', icon: <Assignment />, path: '/forms' },
  { title: 'Tablolar', icon: <TableChart />, path: '/tables' },
  { title: 'Grafikler', icon: <BarChart />, path: '/charts' },
  { title: 'İkonlar', icon: <Category />, path: '/icons' },
  { title: 'Haritalar', icon: <Timeline />, path: '/maps' },
  { title: 'Bileşenler', icon: <ViewModule />, path: '/components' },
  { title: 'Araçlar', icon: <Settings />, path: '/utilities' },
  { title: 'Widget\'lar', icon: <Assessment />, path: '/widgets' },
  { title: 'Multi Level', icon: <Timeline />, path: '/multi-level' }
]

export default function Sidebar({ open, onClose, variant = 'temporary' }: SidebarProps) {
  const location = useLocation()
  const theme = useTheme()
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['Dashboard', 'E Commerce'])

  const handleToggle = (item: string) => {
    setExpandedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    )
  }

  const isActive = (path?: string) => {
    if (!path) return false
    return location.pathname === path
  }

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.title)
    const active = isActive(item.path)

    return (
      <MotionListItem
        key={item.title}
        sx={{ 
          display: 'block',
          px: depth === 0 ? 2 : depth === 1 ? 3 : 4,
          py: 0.5
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ListItemButton
          onClick={() => hasChildren ? handleToggle(item.title) : undefined}
          component={!hasChildren && item.path ? Link : 'div'}
          to={!hasChildren ? item.path : undefined}
          sx={{
            borderRadius: 2,
            mb: 0.5,
            bgcolor: active ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
            color: active ? theme.palette.primary.main : 'inherit',
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.05)
            },
            py: 1,
            px: 2
          }}
        >
          <ListItemIcon 
            sx={{ 
              color: active ? theme.palette.primary.main : 'inherit',
              minWidth: 36
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText 
            primary={item.title}
            primaryTypographyProps={{
              fontSize: depth === 0 ? '0.875rem' : '0.813rem',
              fontWeight: active ? 600 : depth === 0 ? 500 : 400
            }}
          />
          {item.badge && (
            <Chip 
              label={item.badge}
              size="small"
              color={item.isNew ? "secondary" : "primary"}
              sx={{ height: 20, fontSize: '0.7rem' }}
            />
          )}
          {item.isNew && (
            <Chip 
              label="New"
              size="small"
              color="secondary"
              sx={{ height: 20, fontSize: '0.7rem' }}
            />
          )}
          {hasChildren && (
            isExpanded ? <ExpandLess /> : <ExpandMore />
          )}
        </ListItemButton>
        
        {hasChildren && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children?.map(child => renderMenuItem(child, depth + 1))}
                  </List>
                </Collapse>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </MotionListItem>
    )
  }

  const renderSection = (title: string, items: any[], icon?: React.ReactNode) => (
    <Box key={title} sx={{ mb: 2 }}>
      <Typography
        variant="overline"
        sx={{
          px: 3,
          py: 1,
          display: 'block',
          fontWeight: 600,
          fontSize: '0.75rem',
          color: 'text.secondary',
          letterSpacing: 1
        }}
      >
        {icon && <Box component="span" sx={{ mr: 1, verticalAlign: 'middle' }}>{icon}</Box>}
        {title}
      </Typography>
      <List component="div" disablePadding>
        {items.map(item => (
          <MotionListItem
            key={item.title}
            sx={{ px: 2, py: 0.5 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                borderRadius: 2,
                bgcolor: isActive(item.path) ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                color: isActive(item.path) ? theme.palette.primary.main : 'inherit',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.05)
                },
                py: 1,
                px: 2
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: isActive(item.path) ? theme.palette.primary.main : 'inherit',
                  minWidth: 36
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: '0.813rem',
                  fontWeight: isActive(item.path) ? 600 : 400
                }}
              />
            </ListItemButton>
          </MotionListItem>
        ))}
      </List>
    </Box>
  )

  const drawerContent = (
    <MotionBox
      sx={{ 
        width: 280,
        height: '100%',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: alpha(theme.palette.text.primary, 0.2),
          borderRadius: '3px',
        },
      }}
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Store sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2 }}>
              Prium Admin
            </Typography>
            <Typography variant="caption" color="text.secondary">
              E-Commerce Dashboard
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Main Menu */}
      <Box sx={{ py: 2 }}>
        {menuItems.map(item => renderMenuItem(item))}
      </Box>

      <Divider sx={{ mx: 2, my: 1 }} />

      {/* App Section */}
      {renderSection('App', appSections)}

      <Divider sx={{ mx: 2, my: 1 }} />

      {/* Pages Section */}
      {renderSection('Pages', pagesSections)}

      <Divider sx={{ mx: 2, my: 1 }} />

      {/* Modules Section */}
      {renderSection('Modules', modulesSections)}

      {/* Documentation Section */}
      <Box sx={{ p: 3, mt: 2 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
          }}
        >
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
            Dokümantasyon
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
            Kullanım kılavuzu ve özelleştirme rehberi
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip 
              label="Başlangıç" 
              size="small" 
              clickable
              sx={{ fontSize: '0.7rem' }}
            />
            <Chip 
              label="Özelleştirme" 
              size="small" 
              clickable
              variant="outlined"
              sx={{ fontSize: '0.7rem' }}
            />
          </Stack>
        </Box>
      </Box>
    </MotionBox>
  )

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          border: 'none',
          boxShadow: theme.shadows[8]
        },
      }}
    >
      {drawerContent}
    </Drawer>
  )
}
