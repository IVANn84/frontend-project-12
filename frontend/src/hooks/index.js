import { useContext } from 'react';
import { authContext } from '../context/AuthProvider.jsx';
import { SocketContext } from '../context/SocketProvider.jsx';
import { FilterContext } from '../context/FilterProvider .jsx';
import { apiContext } from '../context/ApiProvider .jsx';

export const useAuth = () => useContext(authContext);
export const useSocket = () => useContext(SocketContext);
export const useFilter = () => useContext(FilterContext);
export const useApi = () => useContext(apiContext);
