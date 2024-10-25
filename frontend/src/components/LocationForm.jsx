// src/components/LocationForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import ViewAvailableList from './viewAvailableList';
import { locations, locationsSinhala } from '../config/Locations'; // Importing locations correctly
import { TextField, MenuItem, Button, Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Create a mapping of Sinhala locations to English locations
const locationMapping = {
  "ගම්පොල 1": "Gampola 1",
  "ගම්පොල 2": "Gampola 2",
  "ගම්පොල 3": "Gampola 3",
  "ගම්පොල 4": "Gampola 4",
  "ගම්පොල 5": "Gampola 5",
};

const LocationForm = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [showDrivers, setShowDrivers] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en');

  const handleLocationChange = (event) => {
    setPickupLocation(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const locationToFetch = language === 'si' ? locationMapping[pickupLocation] : pickupLocation; // Get the corresponding English location
    try {
      const response = await axios.get(`http://localhost:8085/drivers?location=${locationToFetch}`);
      setDrivers(response.data);
      setShowDrivers(true);
      setError(null);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      setError("Error fetching drivers. Please try again later.");
      setShowDrivers(false);
    }
  };

  const handleLanguageChange = (event, newLanguage) => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
    }
  };

  return (
    <div style={{
      padding: '20px', textAlign: 'center',
      backgroundColor: '#e8f5e9', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#3c3c3c' }}>
        {language === 'en' ? 'Select Your Pickup Location' : 'ඔබේ ස්ථානය තෝරන්න'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
          <TextField
            select
            label={language === 'en' ? 'Pickup Location' : 'ස්ථානය'}
            value={pickupLocation}
            onChange={handleLocationChange}
            fullWidth
            variant="outlined"
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: '#e0f7fa',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#00796b',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#004d40',
              },
              minWidth: '250px',
            }}
          >
            <MenuItem value="" disabled>
              {language === 'en' ? 'Select your pickup location' : 'ඔබේ ස්ථානය තෝරන්න'}
            </MenuItem>
            {language === 'en' ? locations.map((location, index) => (
              <MenuItem key={index} value={location}>
                {location}
              </MenuItem>
            )) : locationsSinhala.map((location, index) => (
              <MenuItem key={index} value={location}>
                {location}
              </MenuItem>
            ))}
          </TextField>
          <ToggleButtonGroup
            value={language}
            exclusive
            onChange={handleLanguageChange}
            sx={{ marginLeft: '10px', display: 'flex', borderRadius: '12px', backgroundColor: '#e0f7fa' }}
          >
            <ToggleButton
              value="en"
              sx={{
                border: 'none',
                color: language === 'en' ? '#FFD700' : '#B0BEC5',
                backgroundColor: language === 'en' ? '#00796B !important' : '#B2DFDB !important',
                padding: '15px 20px',
                borderRadius: '12px',
              }}
            >
              English
            </ToggleButton>
            <ToggleButton
              value="si"
              sx={{
                border: 'none',
                color: language === 'si' ? '#FFD700' : '#B0BEC5',
                backgroundColor: language === 'si' ? '#FF5722 !important' : '#B2DFDB !important',
                padding: '15px 20px',
                borderRadius: '12px',
              }}
            >
              සිංහල
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#66B2FF !important',
            color: 'black',
            padding: '12px 24px',
            borderRadius: '12px',
            marginTop: '20px',
            fontFamily: '"Noto Sans Sinhala", sans-serif',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          <SearchIcon />
          {language === 'en' ? 'Find Drivers' : 'රියදුරන් සොයන්න'}
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}
      {showDrivers && <ViewAvailableList drivers={drivers} language={language} />}
    </div>
  );
};

export default LocationForm;
