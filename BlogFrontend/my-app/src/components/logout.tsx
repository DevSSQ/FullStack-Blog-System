import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <Button onClick={logout} backgroundColor='red.400'>
      Logout
    </Button>
  );
};

export default Logout;