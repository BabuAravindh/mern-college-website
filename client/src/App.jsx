import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/Home/home';
import About from './components/about/About';
import Coureses from './components/courses/Coureses';
import Contact from './components/contact/Contact';
import Login from './components/Login/Login';
import Register from './components/register/register';
import AdminDashboard from './components/Admin/AdminDashboard';
import AuthenticatedRoute from './components/authenticatedUser/authenticatedUser';
import NotFound from './components/notFound/NotFound';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="about" element={<About />} />
        <Route path="courses" element={<Coureses />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="admin-dashboard"
          element={
            <AuthenticatedRoute>
              <AdminDashboard />
            </AuthenticatedRoute>
          }
        />
          <Route path='*' element={<NotFound/>}/>
      </Routes>
      <ToastContainer />
    </BrowserRouter>

    </>
  );
}

export default App;
