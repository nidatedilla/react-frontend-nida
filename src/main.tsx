import App from 'App.tsx';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'components/ui/provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>
);
