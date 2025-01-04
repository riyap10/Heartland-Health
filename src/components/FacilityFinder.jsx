import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { LoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import "./FacilityFinder.css";
import searchIcon from '../assets/search.png';

const FacilityFinder = () => {
  const [googleMap, setGoogleMap] = useState(null); //for Google Maps
  const [filters, setFilters] = useState({ //for specialist and distance filters
    specialist: "health",
    distance: 0,
  });
  const [zipCode, setZipCode] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 }); //default maps coordinates
  const [zoom, setZoom] = useState(14); //zoom on map
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isHelpVisible, setIsHelpVisible] = useState(false); //for the help section

  //Log facilities as they change
  useEffect(() => {
    console.log({ facilities });
  }, [facilities]);

  //Handles changes to filter inputs
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters({
      ...filters,
      [name]: name === "distance" ? parseInt(value, 10) : value,
    });
  };

  //Handles changes to zip code input
  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };
  
  //Handle search button click or 'enter' key press
  const handleSearch = async () => {
    try {
      const coordinates = await fetchCoordinates(zipCode);
      if (coordinates) {
        setCenter(coordinates);
        setZoom(14); // Zoom in more
        await fetchFacilitiesByLocation(coordinates);
      }
    } catch (error) {
      console.error("Error in handleSearch: ", error);
    }
  };
  
  // Handle 'enter' key press to trigger search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  //Fetches coordinates based on zip code (using Google Maps Geocoding API)
  const fetchCoordinates = async (zip) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: zip,
            key: "AIzaSyBWpGQpX8OK-SQtFwpskVmfobofDs3mhdQ",
          },
        },
      );

      if (response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        alert("Invalid zip code");
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates: ", error);
      return null;
    }
  };

  //Fetches facilities near the given coordinates (using Google Places API)
  const fetchFacilitiesByLocation = async (coordinates) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
        {
          params: {
            location: `${coordinates.lat},${coordinates.lng}`,
            radius: filters.distance ? filters.distance * 1609.34 : 20000, // Converts miles to meters
            keyword: filters.specialist ? filters.specialist : "health",
            key: "AIzaSyBWpGQpX8OK-SQtFwpskVmfobofDs3mhdQ",
          },
        },
      );

      if (response.data.results.length > 0) {
        const filteredFacilities = response.data.results.filter((facility) => {
          return (
            facility.types.includes("hospital") ||
            facility.types.includes("doctor") ||
            facility.types.includes("health")
          );
        });
        setFacilities(filteredFacilities);
      } else {
        alert("No facilities found");
      }
    } catch (error) {
      console.error("Error fetching facilities: ", error);
    }
  };
  //Searches for facilities based on current filters (using Google Places Service)
  const handleFilterSearch = () => {
    const service = new window.google.maps.places.PlacesService(googleMap);

    const request = {
      location: center,
      radius: filters.distance ? filters.distance * 1609.34 : 20000,
      keyword: filters.specialist ? filters.specialist : "health",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        if (results.length > 0) {
          const filteredFacilities = results.filter((facility) => {
            return (
              facility.types.includes("hospital") ||
              facility.types.includes("doctor") ||
              facility.types.includes("health")
            );
          });

          setFacilities(filteredFacilities);
        } else {
          alert("No facilities found");
        }

        const bounds = new window.google.maps.LatLngBounds();

        results.forEach((result) => {
          bounds.extend(result.geometry.location);
        });
        bounds.extend({ lat: center.lat, lng: center.lng });

        googleMap.fitBounds(bounds);
      }
    });
  };

  //Toggles visibility of help section
  const toggleHelp = () => {
    setIsHelpVisible(!isHelpVisible);
  };

  return (
    <div className="facility-finder-container">
      <h2 className="heading">Find a Specialist</h2>
      <div className="content-container">
        <div className="filters">
          {/* Zip code search bar */}
          <div className="search-bar">
            <input
              type="text"
              value={zipCode}
              onChange={handleZipCodeChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter Zip Code"
            />
            <button onClick={handleSearch}>
              <img src={searchIcon} alt="Search" />
            </button>
          </div>
          {/* Specialist filter */}
          <div className="filter-item">
            <label>Specialist: </label>
            <select name="specialist" onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="General Practitioner">General Practitioner</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Ophthalmologist">Ophthalmologist</option>
              <option value="Dentist">Dentist</option>
            </select>
          </div>
          {/* Distance filter */}
          <div className="filter-item">
            <label>Distance: </label>
            <select name="distance" onChange={handleFilterChange}>
              <option value="">Any</option>
              <option value={5}>5 miles</option>
              <option value={10}>10 miles</option>
              <option value={20}>20 miles</option>
              <option value={30}>30 miles or more</option>
            </select>
          </div>
          <button onClick={handleFilterSearch}>Apply Filters</button>
        </div>
        {/* Google Maps API */}
        <div className="map-container">
          <LoadScript
            googleMapsApiKey="AIzaSyBWpGQpX8OK-SQtFwpskVmfobofDs3mhdQ"
            libraries={["places"]}
          >
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "500px" }}
              onLoad={(map) => setGoogleMap(map)}
              center={center}
              zoom={zoom}
            >
              {/* Map markers and Info Windows */}
              {facilities.map((facility) => (
                <Marker
                  key={facility.place_id}
                  position={{
                    lat: facility.geometry.location.lat(),
                    lng: facility.geometry.location.lng(),
                  }}
                  title={facility.name}
                  onClick={() => setSelectedFacility(facility)}
                >
                  {selectedFacility === facility && (
                    <InfoWindow
                      position={{
                        lat: facility.geometry.location.lat(),
                        lng: facility.geometry.location.lng(),
                      }}
                      onCloseClick={() => setSelectedFacility(null)}
                    >
                      <div>
                        <h2>{facility.name}</h2>
                        <p>{facility.vicinity}</p>
                        <p>Rating: {facility.rating}</p>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      {/* Help Section */}
      <div className={`help-section ${isHelpVisible ? "visible" : ""}`}>
        <div className="help-content">
          <h3>How to Use the Facility Finder</h3>
          <p>1. Type in a zip code in the search bar and either hit 'enter' or click the search button to find facilities near that location.</p>
          <p>2. Use the specialist filter to narrow down the type of specialist you are looking for.</p>
          <p>3. Use the distance filter to specify the range within which you want to find facilities.</p>
          <p>4. Click "Apply Filters" to update the map with the filtered facilities.</p>
          <p>5. To hide this help section, simply click the question mark again.</p>
        </div>
        <button className="toggle-help" onClick={toggleHelp}>?</button>
      </div>
    </div>
  );
};

export default FacilityFinder;
