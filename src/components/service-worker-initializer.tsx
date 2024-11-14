'use client';

import { useEffect } from 'react';

export function ServiceWorkerInitializer() {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registrado com sucesso:', registration);
          return registration.pushManager.getSubscription();
        })
        .then(subscription => {
          if (!subscription && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                console.log('Permissão para notificações concedida');
              }
            });
          }
        })
        .catch(error => {
          console.log('Falha ao registrar o Service Worker:', error);
        });
    }
  }, []);

  return null;
}
