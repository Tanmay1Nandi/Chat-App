import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import PrivateRoute from "./myComponents/PrivateRoute"
import Chat from "./pages/chat"
import { useEffect, useState } from "react"

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("/api/user/verify");
        if (response.ok) {
          setUser(true);
        } else {
          setUser(false);
        }
      } catch (err) {
        setUser(false);
      }
    };
    getUser();
  }, []);

  if (user === null) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />}/>
        <Route element={<PrivateRoute />} >
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        {
          user ? <Route path="*" element={<Navigate to="/chat" />} /> : <Route path="*" element={<Navigate to="/auth" />} />
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App

