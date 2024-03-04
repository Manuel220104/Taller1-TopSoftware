import { useState } from 'react'
import { Login } from './pages/login_and_signup/login'
import { Signup } from './pages/login_and_signup/signup'
import { MyAccount } from './pages/user/myAccount';

import { BrowserRouter, Routes, Route, useLocation, redirect } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Iniciar-Sesion" element={<Login />} />
      <Route path="/Registro-Usuario" element={<Signup />} />
      <Route path="/Mi-Cuenta" element={<MyAccount />} />
      </Routes>

      {/* <Navigation />
        <Routes>
          <Route path="/Iniciar-Sesion" element={<Login />} />
          <Route path="/Registro-Usuario" element={<Signup />} />
        </Routes> */}
    </div>
  )
}

export default App
