'use client'

import { useState } from 'react';

export function TestHotGamesNotification() {
  const [result, setResult] = useState<string | null>(null);

  const testNotifications = async () => {
    try {
      const response = await fetch('/api/check-hot-games');
      const data = await response.json();
      if (data.success) {
        setResult(`Notificações enviadas para ${data.notifiedGames} jogos quentes.`);
      } else {
        setResult('Erro ao enviar notificações.');
      }
    } catch (error) {
      setResult('Erro ao testar notificações.');
    }
  };

  return (
    <div>
      <button onClick={testNotifications} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Testar Notificações de Jogos Quentes
      </button>
      {result && <p className="mt-2">{result}</p>}
    </div>
  );
}