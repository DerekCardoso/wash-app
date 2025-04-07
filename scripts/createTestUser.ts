import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

// Inicializa o Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  projectId: 'wash-d2fac'
});

const auth = admin.auth();
const db = admin.firestore();

async function createTestUser() {
  try {
    // Criar usuário cliente
    const customerUser = await auth.createUser({
      email: 'cliente@teste.com',
      password: '123456',
      displayName: 'Cliente Teste'
    });
    
    await db.doc(`users/${customerUser.uid}`).set({
      name: 'Cliente Teste',
      email: 'cliente@teste.com',
      userType: 'customer',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('Usuário cliente criado com sucesso!');

    // Criar usuário dono
    const ownerUser = await auth.createUser({
      email: 'dono@teste.com',
      password: '123456',
      displayName: 'Dono Teste'
    });
    
    await db.doc(`users/${ownerUser.uid}`).set({
      name: 'Dono Teste',
      email: 'dono@teste.com',
      userType: 'owner',
      companyName: 'Lava Rápido Teste',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('Usuário dono criado com sucesso!');

    // Criar lava-rápido para o dono
    const carWashRef = db.collection('carWashes').doc();
    await carWashRef.set({
      id: carWashRef.id,
      name: 'Lava Rápido Teste',
      ownerId: ownerUser.uid,
      address: {
        street: 'Rua Teste',
        number: '123',
        neighborhood: 'Bairro Teste',
        city: 'Cidade Teste',
        state: 'Estado Teste',
        zipCode: '12345-678',
        coordinates: {
          latitude: -23.5505,
          longitude: -46.6333
        }
      },
      services: [
        {
          id: '1',
          name: 'Lavagem Básica',
          description: 'Lavagem externa básica',
          price: 30,
          duration: 30,
          carWashId: carWashRef.id
        },
        {
          id: '2',
          name: 'Lavagem Completa',
          description: 'Lavagem interna e externa',
          price: 60,
          duration: 60,
          carWashId: carWashRef.id
        }
      ],
      workingHours: [
        {
          dayOfWeek: 1,
          openTime: '08:00',
          closeTime: '18:00',
          isOpen: true
        },
        {
          dayOfWeek: 2,
          openTime: '08:00',
          closeTime: '18:00',
          isOpen: true
        },
        {
          dayOfWeek: 3,
          openTime: '08:00',
          closeTime: '18:00',
          isOpen: true
        },
        {
          dayOfWeek: 4,
          openTime: '08:00',
          closeTime: '18:00',
          isOpen: true
        },
        {
          dayOfWeek: 5,
          openTime: '08:00',
          closeTime: '18:00',
          isOpen: true
        },
        {
          dayOfWeek: 6,
          openTime: '08:00',
          closeTime: '14:00',
          isOpen: true
        },
        {
          dayOfWeek: 0,
          openTime: '08:00',
          closeTime: '14:00',
          isOpen: false
        }
      ],
      rating: 0,
      totalRatings: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('Lava-rápido criado com sucesso!');

  } catch (error) {
    console.error('Erro ao criar usuários teste:', error);
  }
}

createTestUser(); 