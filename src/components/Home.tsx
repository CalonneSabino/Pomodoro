import { useState } from 'react';
import { Activity } from '../types';
import ActivityCard from './ActivityCard';
import Timer from './Timer';
import AddActivityModal from './AddActivityModal';
import MaterialButton from './MaterialButton';

interface HomeProps {
  user: string;
  onLogout: () => void;
}

const defaultActivities: Activity[] = [
  { id: '1', name: 'Trabalho', duration: 25, color: '#ef4444', isDefault: true },
  { id: '2', name: 'Estudo', duration: 30, color: '#3b82f6', isDefault: true },
  { id: '3', name: 'Leitura', duration: 20, color: '#22c55e', isDefault: true },
  { id: '4', name: 'Exercício', duration: 15, color: '#f97316', isDefault: true }
];

export default function Home({ user, onLogout }: HomeProps) {
  const [activities, setActivities] = useState<Activity[]>(defaultActivities);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartActivity = (activity: Activity) => {
    setCurrentActivity(activity);
  };

  const handleStopTimer = () => {
    setCurrentActivity(null);
  };

  const handleTimerComplete = () => {
    alert(`Parabéns! Você completou: ${currentActivity?.name}`);
    setCurrentActivity(null);
  };

  const handleAddActivity = (newActivity: Omit<Activity, 'id'>) => {
    const activity: Activity = {
      ...newActivity,
      id: Date.now().toString()
    };
    setActivities(prev => [...prev, activity]);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };

  if (currentActivity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
        <Timer
          activity={currentActivity}
          onComplete={handleTimerComplete}
          onStop={handleStopTimer}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <header className="bg-white shadow-lg border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
            </div>
            <h1 className="text-2xl font-bold text-purple-800">Pomodoro App</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-purple-600 font-medium">Olá, {user}!</span>
            <MaterialButton
              onClick={onLogout}
              variant="outlined"
              size="sm"
            >
              Sair
            </MaterialButton>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-purple-800">Suas Atividades</h2>
          <MaterialButton
            onClick={() => setIsModalOpen(true)}
            size="lg"
          >
            + Nova Atividade
          </MaterialButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activities.map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onStart={handleStartActivity}
              onDelete={!activity.isDefault ? handleDeleteActivity : undefined}
            />
          ))}
        </div>
      </main>

      <AddActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddActivity}
      />
    </div>
  );
}