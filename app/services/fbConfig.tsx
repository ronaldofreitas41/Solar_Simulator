// Importar os módulos necessários do Firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Configuração do Firebase (usando variáveis de ambiente)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, // Adicione o databaseURL se necessário
};

// Inicializar o Firebase App
const app = initializeApp(firebaseConfig);

// Inicializar o Database
const database = getDatabase(app);

// Exportar o Database para uso em outros módulos
export { database };
