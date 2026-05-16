import React, { StrictMode } from 'react' 
import ReactDOM from 'react-dom/client'  
import './login.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)