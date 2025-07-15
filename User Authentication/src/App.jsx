import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp < now) {
          // Token expired
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      } catch (err) {
        // Invalid token
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/signUp",
      element: <SignUp />
    },
    {
      path: "/home",
      element: <Home />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
