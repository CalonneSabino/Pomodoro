import { Activity } from '../types';
import MaterialCard from './MaterialCard';
import MaterialButton from './MaterialButton';

interface ActivityCardProps {
  activity: Activity;
  onStart: (activity: Activity) => void;
  onDelete?: (id: string) => void;
}

export default function ActivityCard({ activity, onStart, onDelete }: ActivityCardProps) {
  return (
    <MaterialCard className="p-6" hover={true}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: activity.color }}
          />
          <h3 className="font-bold text-purple-800 text-lg">{activity.name}</h3>
        </div>
        {!activity.isDefault && onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(activity.id);
            }}
            className="text-purple-400 hover:text-purple-600 w-6 h-6 rounded-full hover:bg-purple-50 flex items-center justify-center transition-all"
          >
            ✕
          </button>
        )}
      </div>
      <p className="text-purple-600 font-medium mb-4">{activity.duration} minutos</p>
      <MaterialButton
        onClick={() => onStart(activity)}
        className="w-full"
      >
        Iniciar
      </MaterialButton>
    </MaterialCard>
  );
}