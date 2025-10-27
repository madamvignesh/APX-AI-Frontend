import { initializeApp } from 'firebase/app';
import { 
  getFirestore, collection, addDoc 
} from 'firebase/firestore';
import { 
  getAuth, signInAnonymously, onAuthStateChanged,
  signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBNlfrqe2rV2SFJDMMDW7pGYfJmMxyJsfc",
  authDomain: "apx-ai-solution.firebaseapp.com",
  projectId: "apx-ai-solution",
  storageBucket: "apx-ai-solution.firebasestorage.app",
  messagingSenderId: "139410815011",
  appId: "1:139410815011:web:afd79086dfeae2e6b41996",
  measurementId: "G-SV063PC3EG"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let currentUserId = null;

// 🔹 Monitor auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUserId = user.uid;
    console.log("✅ Auth active:", currentUserId);
  } else {
    currentUserId = null;
  }
});

// 🔹 Anonymous fallback
export const initAnonymousAuth = async () => {
  try {
    const result = await signInAnonymously(auth);
    currentUserId = result.user.uid;
    console.log('🕶 Anonymous user:', currentUserId);
  } catch (err) {
    console.error('⚠️ Anonymous auth failed:', err);
  }
};

// 🔹 Register user
export const registerUser = async (email, password) => {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    currentUserId = userCred.user.uid;
    console.log('🆕 Registered:', currentUserId);
    return userCred.user;
  } catch (err) {
    console.error('🚫 Registration error:', err.message);
    throw err;
  }
};

// 🔹 Login user
export const loginUser = async (email, password) => {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    currentUserId = userCred.user.uid;
    console.log('🔐 Logged in:', currentUserId);
    return userCred.user;
  } catch (err) {
    console.error('🚫 Login error:', err.message);
    throw err;
  }
};

// 🔹 Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    currentUserId = null;
    console.log('👋 Logged out');
  } catch (err) {
    console.error('⚠️ Logout error:', err);
  }
};

// 🔹 Save conversation
export const saveConversation = async (message, response, conversationId) => {
  try {
    if (!currentUserId) await initAnonymousAuth();
    
    await addDoc(collection(db, 'conversations'), {
      userId: currentUserId,
      conversationId: conversationId || `conv-${Date.now()}`,
      message,
      response,
      timestamp: new Date(),
      type: 'voice-to-voice'
    });

    console.log('💾 Conversation saved.');
  } catch (error) {
    console.error('🚨 Error saving conversation:', error);
  }
};

export { db, auth };
