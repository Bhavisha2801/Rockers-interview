import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './Components/Layout';
import Register from './Components/Register';
import Login from './Components/Login';
import store from './store/Store';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for login status by validating cookie
  useEffect(() => {
    const token = Cookies.get("authToken");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, []);

  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} />
        {isLoggedIn ? (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
