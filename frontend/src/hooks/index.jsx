import { useContext } from 'react';

import { authContext } from '../context/AuthProvider.jsx';

const useAuth = () => useContext(authContext);

export default useAuth;
