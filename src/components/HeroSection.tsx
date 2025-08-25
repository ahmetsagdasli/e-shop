import * as React from 'react'
import { 
  Box, 
  Button, 
  Container, 
  Stack, 
  Typography, 
  Grid, 
  useTheme,
  alpha
} from '@mui/material'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ShoppingBag, TrendingUp, Star, Bolt, 
  Favorite, AutoAwesome, FlashOn, StarBorder
} from '@mui/icons-material'

const MotionBox = motion(Box)
const MotionTypography = motion(Typography)

const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: [0.4, 0.0, 0.2, 1] as any
  }
}

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: [0.4, 0.0, 0.2, 1] as any
  }
}

export default function HeroSection() {
  const theme = useTheme()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  
  return (
    <MotionBox 
      sx={{ 
        position: 'relative',
        minHeight: '80vh',
        overflow: 'hidden',
        color: 'white'
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        background: [
          `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.dark} 100%)`,
          `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.secondary.dark} 100%)`,
          `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.light} 50%, ${theme.palette.primary.main} 100%)`,
          `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.dark} 100%)`
        ],
        transition: {
          opacity: { duration: 0.5 },
          background: { 
            duration: 15, 
            repeat: Infinity, 
            ease: [0.4, 0.0, 0.2, 1] as any 
          }
        }
      }}
    >
      {/* Animated Background Elements */}
      {/* Large Floating Orbs */}
      <MotionBox
        style={{ y: y1 }}
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${alpha(theme.palette.common.white, 0.2)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
          zIndex: 1,
          filter: 'blur(40px)'
        }}
        animate={floatingAnimation as any}
      />
      
      <MotionBox
        style={{ y: y2 }}
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: `radial-gradient(circle at 70% 70%, ${alpha(theme.palette.primary.light, 0.15)}, ${alpha(theme.palette.common.white, 0.05)})`,
          zIndex: 1,
          filter: 'blur(35px)'
        }}
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 1 }
        } as any}
      />

      {/* Medium Geometric Shapes */}
      <MotionBox
        sx={{
          position: 'absolute',
          top: '30%',
          left: '15%',
          width: 80,
          height: 80,
          background: alpha(theme.palette.secondary.main, 0.1),
          zIndex: 1,
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: [0.4, 0.0, 0.2, 1] as any
          }
        } as any}
      />

      <MotionBox
        sx={{
          position: 'absolute',
          top: '60%',
          right: '20%',
          width: 60,
          height: 60,
          background: alpha(theme.palette.primary.light, 0.15),
          zIndex: 1,
          borderRadius: 2,
          transform: 'rotate(45deg)'
        }}
        animate={{
          rotate: [45, 225, 45],
          y: [-20, 20, -20],
          transition: {
            duration: 6,
            repeat: Infinity,
            ease: [0.4, 0.0, 0.2, 1] as any
          }
        } as any}
      />

      {/* Small Particle Effects */}
      {[...Array(12)].map((_, i) => (
        <MotionBox
          key={i}
          sx={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            borderRadius: '50%',
            background: alpha(theme.palette.common.white, Math.random() * 0.3 + 0.1),
            zIndex: 1
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-15, 15, -15],
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
            transition: {
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: [0.4, 0.0, 0.2, 1] as any
            }
          } as any}
        />
      ))}

      {/* Animated Grid Pattern */}
      <MotionBox
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          zIndex: 1,
          backgroundImage: `
            linear-gradient(${alpha(theme.palette.common.white, 0.3)} 1px, transparent 1px),
            linear-gradient(90deg, ${alpha(theme.palette.common.white, 0.3)} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
        animate={{
          backgroundPosition: ['0 0', '50px 50px', '0 0'],
          transition: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }
        } as any}
      />

      {/* Glowing Lines */}
      <MotionBox
        sx={{
          position: 'absolute',
          top: '25%',
          right: '5%',
          width: 2,
          height: 100,
          background: `linear-gradient(to bottom, transparent, ${alpha(theme.palette.secondary.main, 0.6)}, transparent)`,
          zIndex: 1
        }}
        animate={{
          scaleY: [0.5, 1.5, 0.5],
          opacity: [0.3, 1, 0.3],
          transition: {
            duration: 3,
            repeat: Infinity,
            delay: 0.5,
            ease: [0.4, 0.0, 0.2, 1] as any
          }
        } as any}
      />

      <MotionBox
        sx={{
          position: 'absolute',
          bottom: '30%',
          left: '8%',
          width: 80,
          height: 2,
          background: `linear-gradient(to right, transparent, ${alpha(theme.palette.primary.main, 0.5)}, transparent)`,
          zIndex: 1
        }}
        animate={{
          scaleX: [0.5, 1.5, 0.5],
          opacity: [0.4, 1, 0.4],
          transition: {
            duration: 4,
            repeat: Infinity,
            delay: 1,
            ease: [0.4, 0.0, 0.2, 1] as any
          }
        } as any}
      />

      {/* Enhanced Ripple Effects with Multiple Layers */}
      <MotionBox
        sx={{
          position: 'absolute',
          top: '40%',
          right: '30%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          border: `2px solid ${alpha(theme.palette.common.white, 0.1)}`,
          zIndex: 1
        }}
        animate={{
          scale: [0.8, 1.5, 0.8],
          opacity: [0.8, 0, 0.8],
          transition: {
            duration: 5,
            repeat: Infinity,
            ease: [0.4, 0.0, 0.2, 1] as any
          }
        } as any}
      />

      <MotionBox
        sx={{
          position: 'absolute',
          top: '70%',
          left: '25%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
          zIndex: 1
        }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.6, 0, 0.6],
          transition: {
            duration: 6,
            repeat: Infinity,
            delay: 2,
            ease: [0.4, 0.0, 0.2, 1] as any
          }
        } as any}
      />

      {/* DNA Helix Effect */}
      <MotionBox
        sx={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: 4,
          height: 200,
          zIndex: 1
        }}
      >
        {[...Array(10)].map((_, i) => (
          <MotionBox
            key={`dna-${i}`}
            sx={{
              position: 'absolute',
              top: `${i * 20}px`,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: alpha(theme.palette.secondary.main, 0.6),
            }}
            animate={{
              x: [Math.sin(i * 0.6) * 30, Math.sin(i * 0.6 + Math.PI) * 30],
              transition: {
                duration: 4,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut'
              }
            } as any}
          />
        ))}
      </MotionBox>

      {/* Energy Orbs */}
      {[...Array(5)].map((_, i) => (
        <MotionBox
          key={`orb-${i}`}
          sx={{
            position: 'absolute',
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
            width: Math.random() * 60 + 40,
            height: Math.random() * 60 + 40,
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${alpha(theme.palette.common.white, 0.3)}, ${alpha(theme.palette.primary.main, 0.1)})`,
            zIndex: 1,
            filter: 'blur(10px)'
          }}
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [0.4, 0.8, 0.4],
            x: [-20, 20, -20],
            y: [-15, 15, -15],
            transition: {
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: [0.4, 0.0, 0.2, 1] as any
            }
          } as any}
        />
      ))}

      {/* Meteor Shower Effect */}
      {[...Array(8)].map((_, i) => (
        <MotionBox
          key={`meteor-${i}`}
          sx={{
            position: 'absolute',
            top: `${Math.random() * 50}%`,
            left: '-10%',
            width: Math.random() * 100 + 50,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.common.white, 0.8)}, transparent)`,
            zIndex: 1,
            transform: 'rotate(30deg)',
            filter: 'blur(0.5px)'
          }}
          animate={{
            x: ['0vw', '110vw'],
            opacity: [0, 1, 0],
            transition: {
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeOut'
            }
          } as any}
        />
      ))}

      {/* Liquid Motion Waves */}
      <MotionBox
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 120%, ${alpha(theme.palette.secondary.main, 0.15)}, transparent)`,
          zIndex: 1
        }}
        animate={{
          clipPath: [
            'ellipse(60% 40% at 50% 80%)',
            'ellipse(80% 60% at 50% 90%)',
            'ellipse(70% 50% at 50% 85%)',
            'ellipse(60% 40% at 50% 80%)'
          ],
          transition: {
            duration: 12,
            repeat: Infinity,
            ease: [0.4, 0.0, 0.2, 1] as any
          }
        } as any}
      />

      {/* 3D Floating Cubes */}
      {[...Array(6)].map((_, i) => (
        <MotionBox
          key={`cube-${i}`}
          sx={{
            position: 'absolute',
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
            width: Math.random() * 40 + 20,
            height: Math.random() * 40 + 20,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.2)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
            border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
            borderRadius: 2,
            zIndex: 1,
            transform: 'rotateX(45deg) rotateY(45deg)',
            filter: 'blur(1px)'
          }}
          animate={{
            rotateX: [45, 90, 45],
            rotateY: [45, 135, 45],
            y: [-20, 20, -20],
            scale: [0.8, 1.1, 0.8],
            opacity: [0.3, 0.7, 0.3],
            transition: {
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: [0.4, 0.0, 0.2, 1] as any
            }
          } as any}
        />
      ))}

      {/* Color-Shifting Particles */}
      {[...Array(15)].map((_, i) => (
        <MotionBox
          key={`particle-${i}`}
          sx={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: Math.random() * 12 + 6,
            height: Math.random() * 12 + 6,
            borderRadius: '50%',
            zIndex: 1,
            filter: 'blur(1px)'
          }}
          animate={{
            background: [
              alpha(theme.palette.primary.main, 0.4),
              alpha(theme.palette.secondary.main, 0.6),
              alpha(theme.palette.primary.light, 0.5),
              alpha(theme.palette.common.white, 0.3),
              alpha(theme.palette.primary.main, 0.4)
            ],
            y: [-30, 30, -30],
            x: [-15, 15, -15],
            scale: [0.5, 1.2, 0.5],
            opacity: [0.2, 0.8, 0.2],
            transition: {
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: [0.4, 0.0, 0.2, 1] as any
            }
          } as any}
        />
      ))}

      {/* Multi-layer Parallax Background */}
      <MotionBox
        style={{ y: useTransform(scrollY, [0, 300], [0, -20]) }}
        sx={{
          position: 'absolute',
          top: '10%',
          left: '20%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `conic-gradient(from 0deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.2)}, ${alpha(theme.palette.primary.main, 0.1)})`,
          zIndex: 1,
          filter: 'blur(20px)'
        }}
        animate={{
          rotate: [0, 360],
          transition: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }
        } as any}
      />

      {/* Animated Icon Particles */}
      {[Star, AutoAwesome, FlashOn, StarBorder, Favorite].map((IconComponent, i) => (
        <MotionBox
          key={`icon-${i}`}
          sx={{
            position: 'absolute',
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
            color: alpha(theme.palette.common.white, 0.4),
            zIndex: 1,
            pointerEvents: 'none'
          }}
          animate={{
            y: [-40, 40, -40],
            x: [-20, 20, -20],
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.6, 0.2],
            transition: {
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: [0.4, 0.0, 0.2, 1] as any
            }
          } as any}
        >
          <IconComponent sx={{ fontSize: Math.random() * 20 + 16 }} />
        </MotionBox>
      ))}

      {/* Dynamic Gradient Overlays with Enhanced Animation */}
      <MotionBox 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(45deg, 
            ${alpha(theme.palette.primary.dark, 0.4)} 0%, 
            ${alpha(theme.palette.secondary.main, 0.2)} 50%,
            ${alpha(theme.palette.primary.main, 0.3)} 100%)`,
          zIndex: 1
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
          background: [
            `linear-gradient(45deg, ${alpha(theme.palette.primary.dark, 0.4)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 50%, ${alpha(theme.palette.primary.main, 0.3)} 100%)`,
            `linear-gradient(135deg, ${alpha(theme.palette.secondary.dark, 0.3)} 0%, ${alpha(theme.palette.primary.light, 0.4)} 50%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`,
            `linear-gradient(225deg, ${alpha(theme.palette.primary.light, 0.3)} 0%, ${alpha(theme.palette.secondary.dark, 0.3)} 50%, ${alpha(theme.palette.primary.dark, 0.4)} 100%)`,
            `linear-gradient(45deg, ${alpha(theme.palette.primary.dark, 0.4)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 50%, ${alpha(theme.palette.primary.main, 0.3)} 100%)`
          ],
          transition: {
            opacity: { duration: 8, repeat: Infinity, ease: [0.4, 0.0, 0.2, 1] as any },
            background: { duration: 20, repeat: Infinity, ease: [0.4, 0.0, 0.2, 1] as any }
          }
        } as any}
      />

      {/* Neon Light Effects */}
      <MotionBox 
        sx={{
          position: 'absolute',
          top: '30%',
          left: '10%',
          width: 150,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${theme.palette.secondary.main}, transparent)`,
          boxShadow: `0 0 20px ${alpha(theme.palette.secondary.main, 0.8)}`,
          zIndex: 1
        }}
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0],
          x: [0, 200, 400],
          transition: {
            duration: 4,
            repeat: Infinity,
            delay: 1,
            ease: [0.4, 0.0, 0.2, 1] as any
          }
        } as any}
      />

      <MotionBox 
        sx={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: 3,
          height: 120,
          background: `linear-gradient(to bottom, transparent, ${theme.palette.primary.main}, transparent)`,
          boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.6)}`,
          zIndex: 1
        }}
        animate={{
          scaleY: [0, 1, 0],
          opacity: [0, 1, 0],
          y: [0, -100, -200],
          transition: {
            duration: 5,
            repeat: Infinity,
            delay: 2.5,
            ease: [0.4, 0.0, 0.2, 1] as any
          }
        } as any}
      />

      {/* Holographic Effect */}
      <MotionBox 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(110deg, transparent 40%, ${alpha(theme.palette.common.white, 0.1)} 50%, transparent 60%)`,
          zIndex: 1
        }}
        animate={{
          x: ['-100%', '100%'],
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }
        } as any}
      />

      <MotionBox 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at top left, 
            ${alpha(theme.palette.secondary.light, 0.2)} 0%, 
            transparent 50%), 
            radial-gradient(ellipse at bottom right, 
            ${alpha(theme.palette.primary.light, 0.2)} 0%, 
            transparent 50%)`,
          zIndex: 1
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
          transition: {
            duration: 6,
            repeat: Infinity,
            delay: 2,
            ease: [0.4, 0.0, 0.2, 1] as any
          }
        } as any}
      />

      <Container sx={{ position: 'relative', zIndex: 2, py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4} alignItems="center" minHeight="60vh">
          <Grid item xs={12} md={6}>
            <Stack spacing={4}>
              {/* Main Heading */}
              <MotionTypography
                variant="h2"
                fontWeight={900}
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Geleceğin Alışveriş Deneyimi
              </MotionTypography>

              {/* Subtitle */}
              <MotionTypography
                variant="h5"
                sx={{ 
                  opacity: 0.9,
                  fontWeight: 400,
                  fontSize: { xs: '1.1rem', md: '1.3rem' }
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Premium kalitede ürünler, hızlı kargo ve mükemmel müşteri hizmetiyle 
                alışveriş deneyiminizi yeniden tanımlıyoruz.
              </MotionTypography>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      component={Link}
                      to="/shop"
                      variant="contained"
                      size="large"
                      startIcon={<ShoppingBag />}
                      sx={{
                        bgcolor: 'white',
                        color: theme.palette.primary.main,
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 3,
                        '&:hover': {
                          bgcolor: alpha(theme.palette.common.white, 0.9),
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[8]
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Alışverişe Başla
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      component={Link}
                      to="/shop?featured=true"
                      variant="outlined"
                      size="large"
                      startIcon={<Star />}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 3,
                        borderWidth: 2,
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: alpha(theme.palette.common.white, 0.1),
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Öne Çıkanlar
                    </Button>
                  </motion.div>
                </Stack>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  <Grid item xs={4}>
                    <Stack alignItems="center" spacing={1}>
                      <Typography variant="h4" fontWeight={700}>10K+</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Mutlu Müşteri
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack alignItems="center" spacing={1}>
                      <Typography variant="h4" fontWeight={700}>5K+</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Ürün Çeşidi
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack alignItems="center" spacing={1}>
                      <Typography variant="h4" fontWeight={700}>24/7</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Destek
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </motion.div>
            </Stack>
          </Grid>

          {/* Right Side - Feature Cards */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              {/* Feature Card 1 */}
              <MotionBox
                sx={{
                  bgcolor: alpha(theme.palette.common.white, 0.15),
                  backdropFilter: 'blur(10px)',
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <MotionBox
                    sx={{
                      bgcolor: alpha(theme.palette.common.white, 0.2),
                      p: 1.5,
                      borderRadius: 2
                    }}
                    animate={pulseAnimation as any}
                  >
                    <Bolt sx={{ fontSize: 30 }} />
                  </MotionBox>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      Hızlı Kargo
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Aynı gün teslimat seçeneği
                    </Typography>
                  </Box>
                </Stack>
              </MotionBox>

              {/* Feature Card 2 */}
              <MotionBox
                sx={{
                  bgcolor: alpha(theme.palette.common.white, 0.15),
                  backdropFilter: 'blur(10px)',
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <MotionBox
                    sx={{
                      bgcolor: alpha(theme.palette.common.white, 0.2),
                      p: 1.5,
                      borderRadius: 2
                    }}
                    animate={{
                      ...pulseAnimation,
                      transition: { ...pulseAnimation.transition, delay: 0.5 }
                    } as any}
                  >
                    <TrendingUp sx={{ fontSize: 30 }} />
                  </MotionBox>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      En İyi Fiyat Garantisi
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      %100 para iade garantisi
                    </Typography>
                  </Box>
                </Stack>
              </MotionBox>

              {/* Feature Card 3 */}
              <MotionBox
                sx={{
                  bgcolor: alpha(theme.palette.common.white, 0.15),
                  backdropFilter: 'blur(10px)',
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <MotionBox
                    sx={{
                      bgcolor: alpha(theme.palette.common.white, 0.2),
                      p: 1.5,
                      borderRadius: 2
                    }}
                    animate={{
                      ...pulseAnimation,
                      transition: { ...pulseAnimation.transition, delay: 1 }
                    } as any}
                  >
                    <Star sx={{ fontSize: 30 }} />
                  </MotionBox>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      Premium Kalite
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Sadece seçkin markalar
                    </Typography>
                  </Box>
                </Stack>
              </MotionBox>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Scroll Indicator */}
      <MotionBox
        sx={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3
        }}
        animate={{
          y: [0, 10, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <Box
          sx={{
            width: 30,
            height: 50,
            border: `2px solid ${alpha(theme.palette.common.white, 0.5)}`,
            borderRadius: 15,
            position: 'relative'
          }}
        >
          <MotionBox
            sx={{
              width: 4,
              height: 10,
              bgcolor: alpha(theme.palette.common.white, 0.7),
              borderRadius: 2,
              position: 'absolute',
              top: 8,
              left: '50%',
              transform: 'translateX(-50%)'
            }}
            animate={{
              y: [0, 20, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        </Box>
      </MotionBox>
    </MotionBox>
  )
}
