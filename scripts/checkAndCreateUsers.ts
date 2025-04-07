import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDfPuI8sa0mzn-UMJLT_yqH9rDVVQLqngs",
  authDomain: "wash-d2fac.firebaseapp.com",
  projectId: "wash-d2fac",
  storageBucket: "wash-d2fac.firebasestorage.app",
  messagingSenderId: "106816974736",
  appId: "1:106816974736:web:2950a0b9a821e0e5afcd15",
  measurementId: "G-PFJRT57J43"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function checkAndCreateUsers() {
  try {
    // Tenta fazer login com o usuário cliente
    try {
      await signInWithEmailAndPassword(auth, 'cliente@teste.com', '123456');
      console.log('Usuário cliente já existe e credenciais estão corretas');
      
      // Verifica se o documento do usuário existe no Firestore
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser!.uid));
      if (userDoc.exists()) {
        console.log('Dados do cliente no Firestore:', userDoc.data());
      } else {
        console.log('Documento do cliente não encontrado no Firestore, criando...');
        await setDoc(doc(db, 'users', auth.currentUser!.uid), {
          name: 'Cliente Teste',
          email: 'cliente@teste.com',
          userType: 'customer',
          createdAt: new Date()
        });
        console.log('Documento do cliente criado com sucesso!');
      }
    } catch (error) {
      console.log('Erro ao fazer login com cliente:', error);
      // Se não conseguir fazer login, cria o usuário cliente
      const customerUser = await createUserWithEmailAndPassword(
        auth,
        'cliente@teste.com',
        '123456'
      );
      
      await setDoc(doc(db, 'users', customerUser.user.uid), {
        name: 'Cliente Teste',
        email: 'cliente@teste.com',
        userType: 'customer',
        createdAt: new Date()
      });

      console.log('Usuário cliente criado com sucesso!');
    }

    // Cria um novo usuário dono com email diferente
    try {
      const ownerUser = await createUserWithEmailAndPassword(
        auth,
        'dono3@teste.com',
        '123456'
      );
      
      await setDoc(doc(db, 'users', ownerUser.user.uid), {
        name: 'Dono Teste',
        email: 'dono3@teste.com',
        userType: 'owner',
        companyName: 'Lava Rápido Teste',
        createdAt: new Date()
      });

      console.log('Novo usuário dono criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar novo usuário dono:', error);
    }

  } catch (error) {
    console.error('Erro ao verificar/criar usuários:', error);
    if (error instanceof Error) {
      console.error('Detalhes do erro:', {
        message: error.message,
        code: (error as any).code,
        stack: error.stack
      });
    }
  }
}

checkAndCreateUsers(); 