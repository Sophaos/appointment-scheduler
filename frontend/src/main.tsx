import React from 'react'
import ReactDOM from 'react-dom/client'
import { PrimeReactProvider } from "primereact/api";
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from 'store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
    </Provider>
  </React.StrictMode>,
)
