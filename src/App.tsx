import { useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';

function App() {
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (name: string) => {
    setUser(name);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return <Home user={user} onLogout={handleLogout} />;
}

export default App
