import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import Box from '@mui/material/Box';
import median_prices from '../prices';

const PriceDots = ({text}) => (
  <div style ={{
    color: 'white',
    background: 'grey',
    padding: '2px 2px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: '75%'
  }}>
    {text}
  </div>
);

const placePrices = (min, max) => {
  const medianPriceDots = [];
  // console.log('slider price ', document.getElementsByClassName('MuiSlider-valueLabelLabel'));

  median_prices.forEach(el => {
    if (el.rent > min && el.rent < max) {
      medianPriceDots.push(
        <PriceDots
          lat={el.lat}
          lng={el.lng}
          text={`$${el.rent}`}
        />
      );
    }
  });
  return medianPriceDots;
};

const MapContainer = ({ points, prices }) => {

  const heatmapData = {
    positions: points,
    options: {   
      gradient: [
        'rgba(255, 125, 0, 0)',
        'rgba(245, 115, 0, 1)',
        'rgba(235, 105, 0, 1)',
        'rgba(225, 95, 0, 1)',
        'rgba(215, 85, 0, 1)',
        'rgba(205, 75, 0, 1)',
        'rgba(195, 65, 0, 1)',
        'rgba(185, 55, 0, 1)',
        'rgba(200, 45, 0, 1)',
        'rgba(215, 35, 0, 1)',
        'rgba(230, 25, 0, 1)',
        'rgba(245, 15, 0, 1)',
        'rgba(255, 5, 0, 1)',
        'rgba(255, 0, 0, 1)'
      ],
      radius: 20,   
      opacity: .75,
      maxIntensity: 300
    }
  };

  console.log("heatMap",heatmapData);
  
  // console.log("points has been passed down from app.jsx",points);
  const midpoint = {lat: 40.7158, lng: -73.9171};
  return (
    <Box sx={{width: '75%', height: '95vh'}}>
      {console.log("heatmapData maxintensity", heatmapData.options.maxIntensity)}
      <GoogleMapReact 
        bootstrapURLKeys={{ key: process.env.GOOGLE_API , libraries:['visualization'] }}
        defaultCenter={midpoint}
        defaultZoom={11.25}
        heatmapLibrary={true} 
        heatmap={heatmapData}
      >
        {placePrices(prices[0], prices[1])}
      </GoogleMapReact>
    </Box>
  );
}

export default MapContainer;
