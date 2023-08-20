/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import './location.css';

function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    let map;
    let marker;

    // Create the map instance
    const initializeMap = () => {
      map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 6.0535, lng: 80.2170 }, // Galle coordinates
        zoom: 12,
      });

      // Create a marker for Colombo
      marker = new window.google.maps.Marker({
        position: { lat: 6.8214, lng: 80.0415 },
        map: map,
        title: 'Current Location',
      });
    };

    // Initialize map
    initializeMap();

    // Geolocation
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      map.setCenter(pos);

      // Send current location to backend to save to database
      fetch('http://localhost:4000/map/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pos),
      });

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
    <div>
      <Navbar />
      <div className='mapBody'>
        <br />
        <br />
        <br />
        <h2>Train Location</h2>
        <br />
        <br />
        <br />
      </div>

      <div className='container'>
        <br />
        <br />
        <p style={{ textAlign: 'justify' }}>
          Our website provides real-time tracking of train locations, allowing passengers to easily view the current live
          location of their train. With a user-friendly interface, passengers can access this feature through both the
          website and mobile devices. Stay updated on your train's progress and plan accordingly for a smooth and
          convenient journey. Track your train's location in real-time, ensuring you never miss a stop and arrive at your
          destination with confidence. Our website keeps you informed and connected throughout your train travel, making
          it easier to manage your time and enjoy a stress-free experience.
        </p>
        <br />
        <br />
        </div>
        <div className=''>
        <div ref={mapRef} style={{ height: '1000px' }} />
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
}

export default Map;





// import React, { useEffect, useRef } from 'react';
// import Navbar from '../navbar/navbar';
// import Footer from '../footer/footer';
// import './location.css'

// function Map() {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const map = new window.google.maps.Map(mapRef.current, {
//       center: { lat: 37.7749, lng: -122.4194 },
//       zoom: 8,
//     });

//     navigator.geolocation.getCurrentPosition((position) => {
//       const pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//       };

//       // 6.82154, 80.04165

//       map.setCenter(pos);

//       new window.google.maps.Marker({
//         position: pos,
//         map: map,
//         title: 'Train current location',
//       });

//       // Send current location to backend to save to database
//       fetch('http://localhost:4000/map/api', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(pos),
//       });
//     });
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <div className='mapBody'> <br /><br /> <br />
//       <h2>Train Location</h2><br /> <br /><br />
//       </div>

//       <div className="container"> <br /> <br />
//       <p style={{textAlign:"justify"}}>Our website provides real-time tracking of train locations, allowing passengers to easily view the current live location of their train. With a user-friendly interface, passengers can access this feature through both the website and mobile devices. Stay updated on your train's progress and plan accordingly for a smooth and convenient journey. Track your train's location in real-time, ensuring you never miss a stop and arrive at your destination with confidence. Our website keeps you informed and connected throughout your train travel, making it easier to manage your time and enjoy a stress-free experience.</p>
//       <br /> <br />
//         <div ref={mapRef} style={{ height: '800px', border: "1px solid black" }} />
//         <br /><br /><br />
//       </div>
//       <Footer />
//     </div>
//   );
// }
// export default Map;

// import React, { Component } from 'react';
// import { Map, GoogleApiWrapper } from 'google-maps-react';

// const mapStyles = {
//   width: '80%',
//   height: '60%'
// };

// class MapContainer extends Component {
//   render() {
//     return (
//             <Map
//               google={this.props.google}
//               zoom={14}
//               style={mapStyles}
//               initialCenter={{ lat: 37.7749, lng: -122.4194 }} />
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyDRPnzc8AqLM-xlNhcDV7grmrxW2bqG_6I'
// })(MapContainer);


// import React, { useEffect, useRef } from "react";

// const KalutaraMap = () => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Create the map instance
//     const map = new window.google.maps.Map(mapRef.current, {
//       center: { lat: 6.5794, lng: 79.9629 }, // Kalutara coordinates
//       zoom: 12,
//     });

//     // Create a marker for Kalutara
//     const marker = new window.google.maps.Marker({
//       position: { lat: 6.5794, lng: 79.9629 }, // Kalutara coordinates
//       map: map,
//       title: "Kalutara",
//     });
//   }, []);

//   return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
// };

// export default KalutaraMap;