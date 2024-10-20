import React, { useState } from "react";
import axios from "axios";  // Import axios here
import LocationForm from "./LocationForm";
import ViewAvailableList from "./viewAvailableList";


const Booking = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLocationChange = async (location) => {
    setPickupLocation(location);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8085/drivers?location=${location}`);
      setDrivers(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LocationForm onLocationChange={handleLocationChange} />
      {loading && <div>Loading drivers...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {drivers.length > 0 && <ViewAvailableList drivers={drivers} />}
    </div>
  );
};

export default Booking;
