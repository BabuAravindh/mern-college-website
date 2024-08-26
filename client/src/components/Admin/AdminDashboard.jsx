import { useState } from 'react';
import './admin-dashboard.css';
import Sidebar from '../sidebar/sidebar';
import CRUDEvents from '../CRUDEvents/CRUDEvents';
import CRUDcourses from '../CRUDcourses/CRUDcourses';
import CRUDTestimonials from '../CRUDTestimonials/CRUDTestimonials';
import CRUDContact from '../CRUDContact/CRUDContact';

const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('events');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'events':
        return <CRUDEvents />;
      case 'courses':
        return <CRUDcourses />;
      case 'testimonials':
        return <CRUDTestimonials />;
      case 'contacts':
        return <CRUDContact/>
      default:
        return <div>Please select a component from the sidebar.</div>;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar onSelect={setSelectedComponent} selected={selectedComponent} />
      <div className="content">
        <h1>Admin Dashboard</h1>
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
