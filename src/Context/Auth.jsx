import React, { createContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeUser, setUser } from '../Store/CreateSlices';

// Create a context
const AuthContext = createContext(null);

export const authSelector = (state) => state.userLamada || null;
/*************  ✨ Codeium Command ⭐  *************/
/******  cd120a16-cbab-42fb-b90f-2e706b0517f5  *******/
export const ContextProvider = ({ children }) => {
  const [hideSidebar, setHideSidebar] = useState(() => {
    const savedState = localStorage.getItem('stateSidebar');
    return savedState ? JSON.parse(savedState) : true;
  });

  const dispatch = useDispatch();
  const userStore = useSelector(authSelector);

  const [userState, setUserState] = useState(userStore);

  useEffect(() => {
    if (userState) {
      dispatch(setUser(userState));
    } else {
      dispatch(removeUser());
    }
  }, [userState, dispatch]);

  const login = (userData) => {
    setUserState(userData);
    toast.success(`Welcome ${userData.name}`);
  };

  const logout = () => {
    setUserState(null);
    setHideSidebar(true);
    dispatch(removeUser());
  };

  const hideSide = (isHidden) => {
    setHideSidebar(isHidden);
    localStorage.setItem('stateSidebar', JSON.stringify(isHidden));
  };

  return (
    <AuthContext.Provider
      value={{
        userState,
        login,
        logout,
        toastSuccess: (text) => toast.success(text),
        toastError: (text) => toast.error(text),
        hideSide,
        hideSidebar,
      }}
    >
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within a ContextProvider');
  }
  return context;
};

