import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './container/App';
import store from './store';
import './bootstrap.min.css';
import './index.css';

const root = createRoot(document.getElementById('root'))
root.render(

    <StrictMode>
        <Provider store={store}>
        <App />
        </Provider>
    </StrictMode>
)
