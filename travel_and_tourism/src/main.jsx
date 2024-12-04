import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import router from './routers/router'; // Import the router you created
import { RouterProvider } from 'react-router-dom'; // Import RouterProvider

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />  {/* Use RouterProvider with your router */}
  </React.StrictMode>
);
