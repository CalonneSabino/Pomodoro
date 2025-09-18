import { useState } from 'react';
import { Activity } from '../types';
import MaterialCard from './MaterialCard';
import MaterialButton from './MaterialButton';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (activity: Omit<Activity, 'id'>) => void;
}

const colors = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', 
  '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
];

export default function AddActivityModal({ isOpen, onClose, onAdd }: AddActivityModalProps) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(25);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd({
        name: name.trim(),
        duration,
        color: selectedColor,
        isDefault: false
      });
      setName('');
      setDuration(25);
      setSelectedColor(colors[0]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <MaterialCard className="p-8 w-full max-w-md" elevation="high">
        <h2 className="text-2xl font-bold mb-6 text-purple-800">Nova Atividade</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">
              Nome da atividade
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="Ex: Estudar React"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">
              Duração (minutos)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
              max="120"
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">
              Cor
            </label>
            <div className="flex space-x-2">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-3 shadow-md hover:scale-110 transition-all ${
                    selectedColor === color ? 'border-purple-600 ring-2 ring-purple-300' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <MaterialButton
              type="button"
              onClick={onClose}
              variant="outlined"
              className="flex-1"
            >
              Cancelar
            </MaterialButton>
            <MaterialButton
              type="submit"
              className="flex-1"
            >
              Adicionar
            </MaterialButton>
          </div>
        </form>
      </MaterialCard>
    </div>
  );
}