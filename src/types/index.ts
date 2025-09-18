export interface Activity {
  id: string;
  name: string;
  duration: number; // em minutos
  color: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface TimerState {
  isRunning: boolean;
  timeLeft: number;
  currentActivity: Activity | null;
}