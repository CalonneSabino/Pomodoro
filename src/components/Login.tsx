import { useState } from 'react';
import MaterialButton from './MaterialButton';
import logo from "../assets/pomodoro.png"

interface LoginProps {
  onLogin: (name: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-xl border border-purple-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          </div>
            <img
                src={logo}
                className="mx-auto"
                style={{width: '72px', height: '72px'}}
            />
          <h2 className="text-3xl font-bold text-purple-800">
             Onne Time
          </h2>
          <p className="text-purple-600 mt-2">Tecnica pomodoro. Aprimorando seu foco</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-purple-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              placeholder="Digite seu nome"
              required
            />
              <label className="block text-sm font-medium text-purple-700 mb-2">
                  Password
              </label>
              <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-purple-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              placeholder={`Digite sua senha ${password}`}
              required={true}
              />
          </div>
          <MaterialButton
            type="submit"
            className="w-full"
            size="lg"
          >
            Submit
          </MaterialButton>
        </form>
      </div>
    </div>
  );
}