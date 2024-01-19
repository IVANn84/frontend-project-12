import { useContext } from 'react';

import { authContext } from '../context/AuthProvider.jsx';
import { SocketContext } from '../context/SocketProvider.jsx';

export const useAuth = () => useContext(authContext);
export const useSocket = () => useContext(SocketContext);

