import React, { useState } from 'react';
import { 
  ThemeProvider, 
  CssBaseline, 
  Container, 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Button,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import TaxCalculator from './components/TaxCalculator';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#000',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        },
      },
    },
  },
});

const SECTIONS = [
  { id: 'income-details', label: 'Income Details' },
  { id: 'deductions', label: 'Deductions' },
  { id: 'tax-report', label: 'Tax Report' },
];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // AppBar height in pixels
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileOpen(false);
    }
  };

  const renderNavItems = () => (
    <>
      {SECTIONS.map((section) => (
        <Button
          key={section.id}
          color="inherit"
          onClick={() => scrollToSection(section.id)}
          sx={{ ml: 2 }}
        >
          {section.label}
        </Button>
      ))}
    </>
  );

  const renderMobileDrawer = () => (
    <Drawer
      variant="temporary"
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
      }}
    >
      <List>
        {SECTIONS.map((section) => (
          <ListItemButton 
            key={section.id}
            onClick={() => scrollToSection(section.id)}
          >
            <ListItemText primary={section.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Indian Income Tax Calculator
          </Typography>
          
          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {renderNavItems()}
          </Box>

          {/* Mobile Navigation Icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {renderMobileDrawer()}

      <Container>
        <Box sx={{ my: 4 }}>
          <TaxCalculator />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
