
import PropTypes from 'prop-types';

import NotFound from '../notFound/NotFound';


const isAuthenticated = () => {

  const token = localStorage.getItem('token');
  return !!token;
};

// AuthenticatedRoute component
const AuthenticatedRoute = ({ children }) => {
  return isAuthenticated() ? children : <NotFound/>;
};


AuthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthenticatedRoute;
