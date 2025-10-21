import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@store';
import { MainLayout } from '@layouts';
import { AppRoutes } from './router';
import '@styles/index.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </Router>
    </Provider>
  );
}

export default App;
