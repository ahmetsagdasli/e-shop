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
  Fab,
  useTheme,
  alpha
} from '@mui/material'
import {
  Add,
  Chat as ChatIcon,
  Phone,
  VideoCall,
  Send,
  Attachment,
  EmojiEmotions
} from '@mui/icons-material'
import { motion } from 'framer-motion'

const MotionCard = motion(Card)

const contacts = [
  { name: 'Ahmet Yılmaz', lastMessage: 'Merhaba, ürün hakkında...', time: '10:30', unread: 2, online: true },
  { name: 'Ayşe Demir', lastMessage: 'Teşekkürler', time: '09:45', unread: 0, online: false },
  { name: 'Mehmet Kaya', lastMessage: 'Sipariş durumu?', time: '08:20', unread: 1, online: true },
  { name: 'Fatma Öz', lastMessage: 'Harika bir hizmet!', time: 'Dün', unread: 0, online: false },
  { name: 'Ali Çelik', lastMessage: 'Kargo ne zaman gelir?', time: 'Dün', unread: 5, online: true }
]

const messages = [
  { id: 1, sender: 'Ahmet Yılmaz', content: 'Merhaba, MacBook Pro hakkında bilgi alabilir miyim?', time: '10:25', isMe: false },
  { id: 2, sender: 'Ben', content: 'Tabii ki! Hangi model ile ilgileniyorsunuz?', time: '10:26', isMe: true },
  { id: 3, sender: 'Ahmet Yılmaz', content: '16 inç M1 Max modelini merak ediyorum. Stokta var mı?', time: '10:27', isMe: false },
  { id: 4, sender: 'Ben', content: 'Evet, stokta mevcut. Fiyatı ₺21,597. Özel indirimler de var.', time: '10:28', isMe: true },
  { id: 5, sender: 'Ahmet Yılmaz', content: 'Harika! Daha detaylı bilgi alabilir miyim?', time: '10:30', isMe: false }
]

export default function Chat() {
  const theme = useTheme()
  const [selectedContact, setSelectedContact] = React.useState(contacts[0])

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 4 }}>
        Müşteri Sohbeti
      </Typography>

      <Grid container spacing={3} sx={{ height: 'calc(100vh - 200px)' }}>
        {/* Contacts List */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={600}>
                  Sohbetler
                </Typography>
                <IconButton>
                  <Add />
                </IconButton>
              </Stack>
            </Box>
            
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              {contacts.map((contact, index) => (
                <MotionCard
                  key={contact.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  sx={{
                    m: 1,
                    cursor: 'pointer',
                    bgcolor: selectedContact.name === contact.name ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                    border: selectedContact.name === contact.name ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.05)
                    }
                  }}
                  onClick={() => setSelectedContact(contact)}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box sx={{ position: 'relative' }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            bgcolor: theme.palette.primary.main,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 600
                          }}
                        >
                          {contact.name.charAt(0)}
                        </Box>
                        {contact.online && (
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              right: 0,
                              width: 14,
                              height: 14,
                              borderRadius: '50%',
                              bgcolor: 'success.main',
                              border: `2px solid ${theme.palette.background.paper}`
                            }}
                          />
                        )}
                      </Box>
                      
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="subtitle2" fontWeight={600} noWrap>
                            {contact.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {contact.time}
                          </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            noWrap
                            sx={{ flex: 1 }}
                          >
                            {contact.lastMessage}
                          </Typography>
                          {contact.unread > 0 && (
                            <Box
                              sx={{
                                minWidth: 20,
                                height: 20,
                                borderRadius: '50%',
                                bgcolor: theme.palette.primary.main,
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                ml: 1
                              }}
                            >
                              {contact.unread}
                            </Box>
                          )}
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </MotionCard>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Chat Area */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Chat Header */}
            <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 600
                      }}
                    >
                      {selectedContact.name.charAt(0)}
                    </Box>
                    {selectedContact.online && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: 'success.main',
                          border: `2px solid ${theme.palette.background.paper}`
                        }}
                      />
                    )}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {selectedContact.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedContact.online ? 'Çevrimiçi' : 'Son görülme: 2 saat önce'}
                    </Typography>
                  </Box>
                </Stack>
                
                <Stack direction="row" spacing={1}>
                  <IconButton>
                    <Phone />
                  </IconButton>
                  <IconButton>
                    <VideoCall />
                  </IconButton>
                </Stack>
              </Stack>
            </Box>

            {/* Messages */}
            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
              <Stack spacing={2}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Stack
                      direction="row"
                      justifyContent={message.isMe ? 'flex-end' : 'flex-start'}
                      sx={{ mb: 1 }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          maxWidth: '70%',
                          bgcolor: message.isMe ? theme.palette.primary.main : theme.palette.grey[100],
                          color: message.isMe ? 'white' : 'text.primary',
                          borderRadius: message.isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px'
                        }}
                      >
                        <Typography variant="body2">
                          {message.content}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            display: 'block', 
                            mt: 0.5, 
                            opacity: 0.7,
                            textAlign: 'right'
                          }}
                        >
                          {message.time}
                        </Typography>
                      </Paper>
                    </Stack>
                  </motion.div>
                ))}
              </Stack>
            </Box>

            {/* Message Input */}
            <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton>
                  <Attachment />
                </IconButton>
                <Box
                  sx={{
                    flex: 1,
                    bgcolor: alpha(theme.palette.grey[500], 0.1),
                    borderRadius: 3,
                    px: 2,
                    py: 1,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <input
                    placeholder="Mesajınızı yazın..."
                    style={{
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      flex: 1,
                      fontSize: '0.875rem'
                    }}
                  />
                  <IconButton size="small">
                    <EmojiEmotions />
                  </IconButton>
                </Box>
                <Fab
                  color="primary"
                  size="small"
                  sx={{ width: 40, height: 40 }}
                >
                  <Send sx={{ fontSize: 18 }} />
                </Fab>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
