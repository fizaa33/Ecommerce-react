import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './app.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div id="toastContainer" className="position-fixed top-20 end-0 p-5" style={{ zIndex: 1050 }}></div>
    </>
  )
}

export default App
