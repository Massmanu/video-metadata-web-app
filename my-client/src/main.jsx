// src/index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import App from './App';
import './index.css';
// import "tailwindcss";



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** change your primary color & font here **/
        primaryColor: 'teal',
        colorScheme: 'light',
        fontFamily: 'Open Sans, sans-serif',
        fontSizes: { md: 18 },
        headings: { fontFamily: 'Poppins, sans-serif' },
        /** custom breakpoints, spacing… **/
        spacing: { xs: 8, sm: 16, md: 24, lg: 32, xl: 40 },
      }}
    >
      <App />
    </MantineProvider>
  </BrowserRouter>
);
