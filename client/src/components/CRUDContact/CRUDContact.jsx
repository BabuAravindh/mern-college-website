import { useState, useEffect } from 'react';
import axios from 'axios';
import './CRUDContact.css'

const CRUDContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchContacts(); // Fetch contacts when component mounts
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (selectedContact) {
        // Update contact
        await axios.patch(`http://localhost:5000/api/v1/contact/${selectedContact._id}`, {
          name,
          email,
          subject,
          message
        });
        setResponseMessage('Contact updated successfully!');
      }

      clearForm();
      fetchContacts(); // Re-fetch contacts after updating
    } catch (error) {
      console.error('Error updating contact:', error.response?.data || error.message);
      setResponseMessage(`Error updating contact: ${error.response?.data?.error || error.message}`);
    }
  };

  // Handle contact selection
  const handleSelect = (contact) => {
    setSelectedContact(contact);
    setName(contact.name);
    setEmail(contact.email);
    setSubject(contact.subject);
    setMessage(contact.message);
    setResponseMessage('');
  };

  // Handle contact deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/contacts/${id}`);
      setResponseMessage('Contact deleted successfully!');
      setSelectedContact(null);
      clearForm();
      fetchContacts(); // Re-fetch contacts after deletion
    } catch (error) {
      console.error('Error deleting contact:', error.response?.data || error.message);
      setResponseMessage(`Error deleting contact: ${error.response?.data?.error || error.message}`);
    }
  };

  // Clear form fields
  const clearForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setSelectedContact(null);
  };

  return (
    <div className="admin-container">
      <div className="form-container">
        <h2>{selectedContact ? 'Update Contact' : 'Select a Contact to Update'}</h2>
        {selectedContact && (
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit">Update Contact</button>
            <button type="button" onClick={clearForm}>Cancel</button>
          </form>
        )}
        {responseMessage && <p className="response-message">{responseMessage}</p>}
      </div>
      <div className="contacts-container">
        <h2>Contacts</h2>
        {contacts.length > 0 ? (
          <div className="contacts-grid">
            {contacts.map((contact) => (
              <div className="contact-card" key={contact._id}>
                <h3>{contact.name}</h3>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Subject:</strong> {contact.subject}</p>
                <p><strong>Message:</strong> {contact.message}</p>
                <div className="card-actions">
                  <button onClick={() => handleSelect(contact)}>Edit</button>
                  <button onClick={() => handleDelete(contact._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No contacts available.</p>
        )}
      </div>
    </div>
  );
};

export default CRUDContacts;
