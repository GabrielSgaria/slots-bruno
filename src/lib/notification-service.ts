// 'use server'

// import { createNotification } from './db'

// export async function sendNotification(title: string, body: string, type: string) {
//   console.log('Registrando notificação:', { title, body, type })
  
//   try {
//     await createNotification(title, body, type)
//     console.log('Notificação registrada com sucesso')
//     return { success: true }
//   } catch (error) {
//     console.error('Erro ao registrar notificação:', error)
//     return { success: false, error: error }
//   }
// }