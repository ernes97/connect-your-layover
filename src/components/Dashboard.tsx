import React from 'react';
import { LayoverDashboard } from './LayoverDashboard';
import { useCurrentUser } from '../hooks/useLayoverStore';
import { TravelCodeForm } from './TravelCodeForm';

const Dashboard = () => {
  const { user } = useCurrentUser();

  const handleSuccess = () => {
    // Stay on dashboard after successful login
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Acesso ao Dashboard</h1>
            <p className="text-muted-foreground">Faça login para acessar suas conexões</p>
          </div>
          <TravelCodeForm onSuccess={handleSuccess} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <LayoverDashboard />
    </div>
  );
};

export default Dashboard;