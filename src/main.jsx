import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Outlet } from 'react-router'
import PageRouter from './routes/index.jsx'
import HeaderNavbar from './components/navbar/index.jsx'
import FooterPage from './components/footer/index.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <App></App>
      <PageRouter></PageRouter>
      <Outlet></Outlet>
    </BrowserRouter>
    <FooterPage />
  </StrictMode>,
)
