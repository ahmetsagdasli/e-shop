import * as React from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Paper,
  IconButton,
  Button,
  Chip,
  useTheme,
  alpha
} from '@mui/material'
import {
  ChevronLeft,
  ChevronRight,
  Add,
  Event,
  Today,
  Schedule
} from '@mui/icons-material'
import { motion } from 'framer-motion'

const MotionCard = motion(Card)

const events = [
  {
    id: 1,
    title: 'Ürün Lansmanı',
    date: '2025-08-25',
    time: '10:00',
    type: 'meeting',
    description: 'Yeni iPhone modeli tanıtımı'
  },
  {
    id: 2,
    title: 'Müşteri Görüşmesi',
    date: '2025-08-25',
    time: '14:30',
    type: 'call',
    description: 'B2B müşteri ile toplantı'
  },
  {
    id: 3,
    title: 'Stok Kontrolü',
    date: '2025-08-26',
    time: '09:00',
    type: 'task',
    description: 'Aylık stok sayımı'
  },
  {
    id: 4,
    title: 'Pazarlama Toplantısı',
    date: '2025-08-27',
    time: '15:00',
    type: 'meeting',
    description: 'Kampanya stratejileri'
  }
]

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'meeting': return '#2196F3'
    case 'call': return '#4CAF50'
    case 'task': return '#FF9800'
    default: return '#9C27B0'
  }
}

const getEventTypeLabel = (type: string) => {
  switch (type) {
    case 'meeting': return 'Toplantı'
    case 'call': return 'Arama'
    case 'task': return 'Görev'
    default: return 'Etkinlik'
  }
}

export default function CalendarPage() {
  const theme = useTheme()
  const [currentDate, setCurrentDate] = React.useState(new Date())
  
  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ]

  const dayNames = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const getEventsForDate = (day: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(event => event.date === dateString)
  }

  const todayEvents = events.filter(event => {
    const today = new Date().toISOString().split('T')[0]
    return event.date === today
  })

  const days = getDaysInMonth(currentDate)

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 4 }}>
        Takvim
      </Typography>

      <Grid container spacing={3}>
        {/* Calendar */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              {/* Calendar Header */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h5" fontWeight={600}>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton onClick={() => navigateMonth('prev')}>
                    <ChevronLeft />
                  </IconButton>
                  <Button variant="outlined" startIcon={<Today />}>
                    Bugün
                  </Button>
                  <IconButton onClick={() => navigateMonth('next')}>
                    <ChevronRight />
                  </IconButton>
                </Stack>
              </Stack>

              {/* Day Headers */}
              <Grid container sx={{ mb: 1 }}>
                {dayNames.map((dayName) => (
                  <Grid item xs key={dayName}>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color="text.secondary"
                      textAlign="center"
                      sx={{ py: 1 }}
                    >
                      {dayName}
                    </Typography>
                  </Grid>
                ))}
              </Grid>

              {/* Calendar Grid */}
              <Grid container>
                {days.map((day, index) => {
                  const dayEvents = day ? getEventsForDate(day) : []
                  const isToday = day && 
                    new Date().getDate() === day &&
                    new Date().getMonth() === currentDate.getMonth() &&
                    new Date().getFullYear() === currentDate.getFullYear()

                  return (
                    <Grid item xs key={index}>
                      <Box
                        sx={{
                          minHeight: 100,
                          p: 1,
                          border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                          bgcolor: day ? 'transparent' : alpha(theme.palette.grey[500], 0.05),
                          position: 'relative',
                          cursor: day ? 'pointer' : 'default',
                          '&:hover': {
                            bgcolor: day ? alpha(theme.palette.primary.main, 0.05) : 'transparent'
                          }
                        }}
                      >
                        {day && (
                          <>
                            <Typography
                              variant="body2"
                              fontWeight={isToday ? 700 : 400}
                              sx={{
                                color: isToday ? theme.palette.primary.main : 'text.primary',
                                mb: 1
                              }}
                            >
                              {day}
                            </Typography>
                            
                            <Stack spacing={0.5}>
                              {dayEvents.slice(0, 2).map((event) => (
                                <motion.div
                                  key={event.id}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Box
                                    sx={{
                                      bgcolor: getEventTypeColor(event.type),
                                      color: 'white',
                                      borderRadius: 1,
                                      px: 1,
                                      py: 0.5,
                                      fontSize: '0.7rem',
                                      fontWeight: 500,
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    {event.time} {event.title}
                                  </Box>
                                </motion.div>
                              ))}
                              {dayEvents.length > 2 && (
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{ fontSize: '0.65rem' }}
                                >
                                  +{dayEvents.length - 2} daha
                                </Typography>
                              )}
                            </Stack>
                          </>
                        )}
                      </Box>
                    </Grid>
                  )
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            {/* Add Event Button */}
            <Button
              variant="contained"
              startIcon={<Add />}
              size="large"
              sx={{ borderRadius: 3 }}
            >
              Yeni Etkinlik Ekle
            </Button>

            {/* Today's Events */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Bugünün Etkinlikleri
                </Typography>
                
                {todayEvents.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    Bugün için etkinlik yok
                  </Typography>
                ) : (
                  <Stack spacing={2}>
                    {todayEvents.map((event, index) => (
                      <MotionCard
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        sx={{
                          bgcolor: alpha(getEventTypeColor(event.type), 0.1),
                          border: `1px solid ${alpha(getEventTypeColor(event.type), 0.3)}`
                        }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {event.title}
                            </Typography>
                            <Chip
                              label={getEventTypeLabel(event.type)}
                              size="small"
                              sx={{
                                bgcolor: getEventTypeColor(event.type),
                                color: 'white',
                                fontSize: '0.7rem'
                              }}
                            />
                          </Stack>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                            <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {event.time}
                            </Typography>
                          </Stack>
                          <Typography variant="body2" color="text.secondary">
                            {event.description}
                          </Typography>
                        </CardContent>
                      </MotionCard>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Bu Ay
                </Typography>
                
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Toplam Etkinlik</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {events.length}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Toplantılar</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {events.filter(e => e.type === 'meeting').length}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Görevler</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {events.filter(e => e.type === 'task').length}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Aramalar</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {events.filter(e => e.type === 'call').length}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}
