// Import React Modules
import { Navigate, Outlet } from 'react-router-dom';
// Import Custom Hooks
import { useAuthStatus } from '../hooks/useAuthStatus';
// Import Components
import Spinner from './Spinner';

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />
  }

  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute