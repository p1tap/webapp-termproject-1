import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
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
            <Button color="inherit" component={Link} to="/">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/all-cars">
              All Cars
            </Button>
            <Button color="inherit" component={Link} to="/highlighted">
              Highlighted Cars
            </Button>
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: '2rem' }}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/all-cars" element={<AllCarsPage />} />
            <Route path="/highlighted" element={<HighlightedCarsPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;