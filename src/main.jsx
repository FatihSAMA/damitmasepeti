import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import CalculationProvider from './context/CalculationProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CalculationProvider>
      <RouterProvider router={router} />
    </CalculationProvider>
  </React.StrictMode>,
)
