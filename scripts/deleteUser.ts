import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Inicializa o Firebase Admin SDK
initializeApp({
  credential: cert({
    "type": "service_account",
    "project_id": "wash-d2fac",
    "private_key_id": "YOUR_PRIVATE_KEY_ID",
    "private_key": "YOUR_PRIVATE_KEY",
    "client_email": "YOUR_CLIENT_EMAIL",
    "client_id": "YOUR_CLIENT_ID",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "YOUR_CERT_URL"
  })
});

async function deleteUserByEmail(email: string) {
  try {
    // Busca o usuário pelo email
    const user = await getAuth().getUserByEmail(email);
    
    // Deleta o usuário
    await getAuth().deleteUser(user.uid);
    console.log(`Usuário ${email} deletado com sucesso!`);
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
  }
}

// Deleta o usuário dono
deleteUserByEmail('dono@teste.com'); 