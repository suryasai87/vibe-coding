import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material'
import { Menu as MenuIcon, Dashboard as DashboardIcon, BarChart as AnalyticsIcon, Description as ReportsIcon, Settings as SettingsIcon, Api as ApiIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

const DRAWER_WIDTH_EXPANDED = 240
const DRAWER_WIDTH_MINIMIZED = 72

interface NavItem {
  text: string
  icon: JSX.Element
  path: string
}

const navItems: NavItem[] = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
]

function App() {
  const [drawerOpen, setDrawerOpen] = useState(true)
  const [drawerExpanded, setDrawerExpanded] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleDrawerToggle = () => {
    if (!drawerOpen) {
      setDrawerOpen(true)
      setDrawerExpanded(true)
    } else if (drawerExpanded) {
      setDrawerExpanded(false)
    } else {
      setDrawerOpen(false)
    }
  }

  const currentDrawerWidth = drawerExpanded ? DRAWER_WIDTH_EXPANDED : DRAWER_WIDTH_MINIMIZED

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ mr: 2 }}
            >
              {drawerExpanded ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Capacity Management
            </Typography>
            <IconButton
              color="inherit"
              aria-label="api docs"
              onClick={() => window.open('/docs', '_blank')}
            >
              <ApiIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <AnimatePresence>
          {drawerOpen && (
            <Drawer
              variant="permanent"
              sx={{
                width: currentDrawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: currentDrawerWidth,
                  boxSizing: 'border-box',
                  transition: 'width 0.3s ease-in-out',
                  overflowX: 'hidden',
                },
              }}
            >
              <Toolbar />
              <Box sx={{ overflow: 'auto' }}>
                <List>
                  {navItems.map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                      <ListItemButton
                        selected={selectedIndex === index}
                        onClick={() => setSelectedIndex(index)}
                        sx={{
                          minHeight: 48,
                          justifyContent: drawerExpanded ? 'initial' : 'center',
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: drawerExpanded ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        {drawerExpanded && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ListItemText primary={item.text} />
                          </motion.div>
                        )}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          )}
        </AnimatePresence>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: `calc(100% - ${drawerOpen ? currentDrawerWidth : 0}px)`,
            transition: 'width 0.3s ease-in-out, margin 0.3s ease-in-out',
            ml: drawerOpen ? 0 : 0,
          }}
        >
          <Toolbar />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" gutterBottom>
              Welcome to Capacity Management
            </Typography>
            <Typography variant="body1" paragraph>
              This is a modern React application with Material-UI and Framer Motion animations,
              backed by a FastAPI backend and ready for Databricks deployment.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Features:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body1">
                Responsive navigation drawer with expand/collapse functionality
              </Typography>
              <Typography component="li" variant="body1">
                Material-UI components with modern design
              </Typography>
              <Typography component="li" variant="body1">
                Smooth animations powered by Framer Motion
              </Typography>
              <Typography component="li" variant="body1">
                FastAPI backend with automatic API documentation
              </Typography>
              <Typography component="li" variant="body1">
                One-command deployment to Databricks Apps
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
