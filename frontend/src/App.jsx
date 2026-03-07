import React from 'react';
import LoginPage from './components/LoginPage';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <div>
      <Toaster
        richColors={true}
      />
      <LoginPage />
    </div>
  );
};

export default App;