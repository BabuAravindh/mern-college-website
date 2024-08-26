import { useState, useEffect } from 'react';
import axios from 'axios';
import './CRUDEvents.css';

const CRUDEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchEvents(); // Call fetchEvents when component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const payload = {
        name: eventName,
        date,
        location,
        description
      };
  
      if (selectedEvent) {
        // Update event
        const response = await axios.patch(`http://localhost:5000/api/v1/events/${selectedEvent._id}`, payload);
        setMessage('Event updated successfully!');
      } else {
        // Create event
        const response = await axios.post('http://localhost:5000/api/v1/events', payload);
        setMessage('Event created successfully!');
      }
  
      clearForm();
      fetchEvents(); // Re-fetch events after creating/updating
    } catch (error) {
      console.error('Error creating/updating event:', error.response?.data || error.message);
      setMessage(`Error creating/updating event: ${error.response?.data?.error || error.message}`);
    }
  };
  

  // Handle event selection
  const handleSelect = (event) => {
    setSelectedEvent(event);
    setEventName(event.name);
    setDate(event.date);
    setLocation(event.location);
    setDescription(event.description);
    setMessage('');
  };

  // Handle event deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/events/${id}`);
      setMessage('Event deleted successfully!');
      setSelectedEvent(null);
      clearForm();
      fetchEvents(); // Re-fetch events after deletion
    } catch (error) {
      console.error('Error deleting event:', error.response?.data || error.message);
      setMessage(`Error deleting event: ${error.response?.data?.error || error.message}`);
    }
  };

  // Clear form fields
  const clearForm = () => {
    setEventName('');
    setDate('');
    setLocation('');
    setDescription('');
    setSelectedEvent(null);
  };

  return (
    <div className="admin-container">
      <div className="form-container">
        <h2>{selectedEvent ? 'Update Event' : 'Create New Event'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="eventName">Event Name</label>
            <input
              type="text"
              id="eventName"
              placeholder="Enter event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              placeholder="Enter event location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit">{selectedEvent ? 'Update Event' : 'Create Event'}</button>
          {selectedEvent && <button type="button" onClick={clearForm}>Cancel</button>}
        </form>
        {message && <p className="message">{message}</p>}
      </div>
      <div className="events-container">
        <h2>Events</h2>
        {events.length > 0 ? (
          <div className="events-grid">
            {events.map((event) => (
              <div className="event-card" key={event._id}>
                <h3>{event.name}</h3>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Description:</strong> {event.description}</p>
                <div className="card-actions">
                  <button onClick={() => handleSelect(event)}>Edit</button>
                  <button onClick={() => handleDelete(event._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default CRUDEvents;
