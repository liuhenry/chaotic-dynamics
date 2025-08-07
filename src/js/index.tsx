import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './store/store';
import App from './components/app';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
