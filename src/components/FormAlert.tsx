import { useEffect, useState } from 'react';

interface FormAlertProps {
  message: string | null;
  type: 'success' | 'error';
  onDismiss?: () => void;
}

export default function FormAlert({ message, type, onDismiss }: FormAlertProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onDismiss?.();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onDismiss]);

  if (!message || !visible) return null;

  const bg = type === 'success' ? 'rgba(72,187,120,0.1)' : 'rgba(245,101,101,0.1)';
  const border = type === 'success' ? 'rgba(72,187,120,0.3)' : 'rgba(245,101,101,0.3)';
  const color = type === 'success' ? '#48bb78' : '#f56565';
  const icon = type === 'success' ? '✓' : '✗';

  return (
    <div
      className="flex items-center gap-2 px-4 py-3 text-sm mb-6"
      style={{ backgroundColor: bg, border: `1px solid ${border}`, color }}
    >
      <span className="text-xs">{icon}</span>
      <span>{message}</span>
    </div>
  );
}
