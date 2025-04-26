import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import PrivateRoute from "./myComponents/PrivateRoute"
import Chat from "./pages/chat"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />}/>
        <Route element={<PrivateRoute />} >
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

