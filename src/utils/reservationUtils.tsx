
import { Badge } from '@/components/ui/badge';

export const getStatusBadge = (status: string) => {
  const variants = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    active: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const labels = {
    pending: 'În așteptare',
    confirmed: 'Confirmată',
    active: 'Activă',
    completed: 'Finalizată',
    cancelled: 'Anulată'
  };

  return (
    <Badge className={variants[status as keyof typeof variants]} variant="secondary">
      {labels[status as keyof typeof labels]}
    </Badge>
  );
};
