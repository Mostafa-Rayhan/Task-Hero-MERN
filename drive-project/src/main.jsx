import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './app.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(


<AppContextProvider>
<BrowserRouter>
   <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
</AppContextProvider>
 ,
)
