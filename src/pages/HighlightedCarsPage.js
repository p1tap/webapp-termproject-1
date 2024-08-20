import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  CardMedia,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Box,
  Button,
  Popover,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterListIcon from '@mui/icons-material/FilterList';
import CustomTooltip from '../utils/CustomTooltip';
import { styled } from '@mui/material/styles';

const ScrollableColumn = styled(Box)(({ theme }) => ({
  maxHeight: '300px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '0.4em'
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    outline: '1px solid slategrey'
  }
}));

function HighlightedCarsPage() {
  const [highlightedCars, setHighlightedCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('nameAsc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    brands: [],
    models: [],
    years: [],
    priceRange: [0, 1000000000]
  });

  useEffect(() => {
    const storedHighlightedCars = JSON.parse(localStorage.getItem('highlightedCars')) || [];
    setHighlightedCars(storedHighlightedCars);
  }, []);

  const removeHighlight = (car) => {
    const updatedHighlightedCars = highlightedCars.filter(c => c.Cid !== car.Cid);
    setHighlightedCars(updatedHighlightedCars);
    localStorage.setItem('highlightedCars', JSON.stringify(updatedHighlightedCars));
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filterOpen = Boolean(anchorEl);

  const filteredCars = highlightedCars.filter(car => {
    const matchesSearch = car.NameMMT.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.Prc.includes(searchQuery) ||
                          car.Yr.toString().includes(searchQuery);
    
    const matchesBrand = filters.brands.length === 0 || filters.brands.includes(car.NameMMT.split(' ')[0]);
    const matchesModel = filters.models.length === 0 || filters.models.includes(car.Model);
    const matchesYear = filters.years.length === 0 || filters.years.includes(car.Yr);
    const matchesPrice = parseInt(car.Prc.replace(/,/g, '')) >= filters.priceRange[0] &&
                         parseInt(car.Prc.replace(/,/g, '')) <= filters.priceRange[1];

    return matchesSearch && matchesBrand && matchesModel && matchesYear && matchesPrice;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortCriteria) {
      case 'nameAsc':
        return a.NameMMT.localeCompare(b.NameMMT);
      case 'nameDesc':
        return b.NameMMT.localeCompare(a.NameMMT);
      case 'priceLow':
        return parseInt(a.Prc.replace(/,/g, '')) - parseInt(b.Prc.replace(/,/g, ''));
      case 'priceHigh':
        return parseInt(b.Prc.replace(/,/g, '')) - parseInt(a.Prc.replace(/,/g, ''));
      case 'yearNew':
        return b.Yr - a.Yr;
      case 'yearOld':
        return a.Yr - b.Yr;
      default:
        return 0;
    }
  });

  const uniqueBrands = [...new Set(highlightedCars.map(car => car.NameMMT.split(' ')[0]))].sort();
  const uniqueModels = [...new Set(highlightedCars.map(car => car.Model))].sort();
  const uniqueYears = [...new Set(highlightedCars.map(car => car.Yr))].sort((a, b) => b - a);
  const priceRange = highlightedCars.length > 0 ? [
    Math.min(...highlightedCars.map(car => parseInt(car.Prc.replace(/,/g, '')))),
    Math.max(...highlightedCars.map(car => parseInt(car.Prc.replace(/,/g, ''))))
  ] : [0, 1000000000];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Favorites
      </Typography>
      {highlightedCars.length === 0 ? (
        <Typography>No cars have been highlighted yet.</Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Search favorites"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <Select
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="nameAsc">Name (A-Z)</MenuItem>
              <MenuItem value="nameDesc">Name (Z-A)</MenuItem>
              <MenuItem value="priceLow">Price (Low-High)</MenuItem>
              <MenuItem value="priceHigh">Price (High-Low)</MenuItem>
              <MenuItem value="yearNew">Year (Newest First)</MenuItem>
              <MenuItem value="yearOld">Year (Oldest First)</MenuItem>
            </Select>
            <Button variant="outlined" onClick={handleFilterClick} startIcon={<FilterListIcon />}>
              Filter
            </Button>
          </Box>
          <Popover
            open={filterOpen}
            anchorEl={anchorEl}
            onClose={handleFilterClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              style: { width: '800px', maxWidth: '90vw' },
            }}
          >
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6" gutterBottom>Brands</Typography>
                  <ScrollableColumn>
                    <FormGroup>
                      {uniqueBrands.map(brand => (
                        <FormControlLabel
                          key={brand}
                          control={
                            <Checkbox
                              checked={filters.brands.includes(brand)}
                              onChange={(e) => handleFilterChange('brands', 
                                e.target.checked 
                                  ? [...filters.brands, brand]
                                  : filters.brands.filter(b => b !== brand)
                              )}
                            />
                          }
                          label={brand}
                        />
                      ))}
                    </FormGroup>
                  </ScrollableColumn>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6" gutterBottom>Models</Typography>
                  <ScrollableColumn>
                    <FormGroup>
                      {uniqueModels.map(model => (
                        <FormControlLabel
                          key={model}
                          control={
                            <Checkbox
                              checked={filters.models.includes(model)}
                              onChange={(e) => handleFilterChange('models', 
                                e.target.checked 
                                  ? [...filters.models, model]
                                  : filters.models.filter(m => m !== model)
                              )}
                            />
                          }
                          label={model}
                        />
                      ))}
                    </FormGroup>
                  </ScrollableColumn>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6" gutterBottom>Years</Typography>
                  <ScrollableColumn>
                    <FormGroup>
                      {uniqueYears.map(year => (
                        <FormControlLabel
                          key={year}
                          control={
                            <Checkbox
                              checked={filters.years.includes(year)}
                              onChange={(e) => handleFilterChange('years', 
                                e.target.checked 
                                  ? [...filters.years, year]
                                  : filters.years.filter(y => y !== year)
                              )}
                            />
                          }
                          label={year}
                        />
                      ))}
                    </FormGroup>
                  </ScrollableColumn>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6" gutterBottom>Price Range</Typography>
                  <Box sx={{ px: 2 }}>
                    <Slider
                      value={filters.priceRange}
                      onChange={(e, newValue) => handleFilterChange('priceRange', newValue)}
                      valueLabelDisplay="auto"
                      min={priceRange[0]}
                      max={priceRange[1]}
                    />
                    <Typography>
                      {filters.priceRange[0].toLocaleString()} - {filters.priceRange[1].toLocaleString()}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" onClick={handleFilterClose}>
                  Apply Filters
                </Button>
              </Box>
            </Box>
          </Popover>
          <Grid container spacing={3}>
            {sortedCars.map(car => (
              <Grid item xs={12} sm={6} md={4} key={car.Cid}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={car.Img600}
                    alt={car.NameMMT}
                  />
                  <CardContent>
                    <CustomTooltip title={car.NameMMT} placement="top">
                      <Typography variant="h6" noWrap>{car.NameMMT}</Typography>
                    </CustomTooltip>
                    <Typography>Price: {car.Prc} {car.Currency}</Typography>
                    <Typography>Year: {car.Yr}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton 
                      aria-label="remove from favorites"
                      onClick={() => removeHighlight(car)}
                    >
                      <FavoriteIcon color="secondary" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}

export default HighlightedCarsPage;