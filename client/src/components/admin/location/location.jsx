/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';

import NavbarAdmin from '../navbarAdmin/navbar';
import Footer from '../footerAdmin/footerAdmin';


function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    let map;
    let marker;

    // Create the map instance
    function initializeMap() {
      map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 6.0535, lng: 80.2170 },
        zoom: 12,
      });

      // Create a marker for Colombo
      marker = new window.google.maps.Marker({
        position: { lat: 6.8214, lng: 80.0415 },
        map: map,
        title: 'Current Location',
      });
    }

    // Initialize map
    initializeMap();

    // Geolocation
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      map.setCenter(pos);
      // Request directions from Google Maps Directions Service
      const directionsService = new window.google.maps.DirectionsService();
      const directionsDisplay1 = new window.google.maps.DirectionsRenderer();
      const directionsDisplay2 = new window.google.maps.DirectionsRenderer();
      const directionsDisplay3 = new window.google.maps.DirectionsRenderer();
      const directionsDisplay4 = new window.google.maps.DirectionsRenderer();
      const directionsDisplay5 = new window.google.maps.DirectionsRenderer();
      const directionsDisplay6 = new window.google.maps.DirectionsRenderer();

      directionsDisplay1.setMap(map);
      directionsDisplay2.setMap(map);
      directionsDisplay3.setMap(map);
      directionsDisplay4.setMap(map);
      directionsDisplay5.setMap(map);
      directionsDisplay6.setMap(map);


      const request1 = {
        origin: 'Colombo',
        destination: 'Kurunegala', 
        travelMode: 'TRANSIT', 
      };

      const request2 = {
        origin: 'Galle', 
        destination: 'Colombo',
        travelMode: 'TRANSIT', 
      };

      const request3 = {
        origin: 'Colombo', 
        destination: 'Kandy', 
        travelMode: 'TRANSIT',
      };

      const request4 = {
        origin: 'Colombo', 
        destination: 'Jaffna', 
        travelMode: 'TRANSIT', 
      };

      const request5 = {
        origin: 'Colombo', 
        destination: 'Kaluthara', 
        travelMode: 'TRANSIT', 
      };

      const request6 = {
        origin: 'Colombo', 
        destination: 'Badulla', 
        travelMode: 'TRANSIT', 
      };

      directionsService.route(request1, function (result, status) {
        if (status === 'OK') {
          directionsDisplay1.setDirections(result);
        } else {
          console.error('Error:', status);
        }
      });

      directionsService.route(request2, function (result, status) {
        if (status === 'OK') {
          directionsDisplay2.setDirections(result);
        } else {
          console.error('Error:', status);
        }
      });

      directionsService.route(request3, function (result, status) {
        if (status === 'OK') {
          directionsDisplay3.setDirections(result);
        } else {
          console.error('Error:', status);
        }
      });

      directionsService.route(request4, function (result, status) {
        if (status === 'OK') {
          directionsDisplay4.setDirections(result);
        } else {
          console.error('Error:', status);
        }
      });

      directionsService.route(request5, function (result, status) {
        if (status === 'OK') {
          directionsDisplay5.setDirections(result);
        } else {
          console.error('Error:', status);
        }
      });

      directionsService.route(request6, function (result, status) {
        if (status === 'OK') {
          directionsDisplay6.setDirections(result);
        } else {
          console.error('Error:', status);
        }
      });

    });
  }, []);

  return (
    <div><NavbarAdmin/>
       
        <div className="container"><br/>
      <h2>Location</h2><br/><br/>
      <div ref={mapRef} style={{ height: '1000px' }} /><br/><br/><br/>
    </div><br/>
    <Footer/>
    </div>
  );
}

export default Map;
