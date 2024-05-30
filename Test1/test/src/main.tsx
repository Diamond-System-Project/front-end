import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Login />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element.');
}
