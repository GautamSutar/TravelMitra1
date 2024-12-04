import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventList from './EventList';

const EventSection = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);


  // Fetch data for a specific type or all places
  const fetchData = async() => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/event/getEvent`);
      console.log("Fetched Data:", response.data); // Check the structure of the response
      setEventData(response.data);
      setLoading(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };


  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      {/* Category Selection and Market List */}
      <div className="chooseCategory mt-10">
        <h1 className="text-3xl text-center mb-8 font-bold font-lora bg-gradient-to-r from-green-600 to-yellow-800 bg-clip-text text-transparent">Events</h1>
      </div>
      <div className="mt-5 bg-white flex flex-col items-center justify-center">
        <div>
          <EventList eventData={eventData.events || []} loading={loading} />
        </div>
      </div>  
    </>
  );
};
export default EventSection;
