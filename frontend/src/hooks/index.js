import { useContext } from 'react';
import { authContext } from '../providers/AuthProvider.jsx';
import { SocketContext } from '../providers/SocketProvider.jsx';
import { FilterContext } from '../providers/FilterProvider .jsx';
import { apiContext } from '../providers/ApiProvider .jsx';

export const useAuth = () => useContext(authContext);
export const useSocket = () => useContext(SocketContext);
export const useFilter = () => useContext(FilterContext);
export const useApi = () => useContext(apiContext);
