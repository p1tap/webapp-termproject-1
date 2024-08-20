import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, IconButton, Container, Tooltip } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DashboardPage from './pages/DashboardPage';
import AllCarsPage from './pages/AllCarsPage';
import HighlightedCarsPage from './pages/HighlightedCarsPage';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Car Market App
            </Typography>
            <Tooltip title="Dashboard">
              <IconButton color="inherit" component={Link} to="/">
                <DashboardIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="All Cars">
              <IconButton color="inherit" component={Link} to="/all-cars">
                <DirectionsCarIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Favorites">
              <IconButton color="inherit" component={Link} to="/highlighted">
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: '2rem' }}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/all-cars" element={<AllCarsPage />} />
            <Route path="/highlighted" element={<HighlightedCarsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;