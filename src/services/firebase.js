import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import {
	getFirestore,
	collection,
	addDoc,
	serverTimestamp,
	onSnapshot,
	query,
	orderBy,
} from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAQrYRIBfONjtv1753PahrlOxpdD4nYawg",
  authDomain: "chat-room-40a4c.firebaseapp.com",
  projectId: "chat-room-40a4c",
  storageBucket: "chat-room-40a4c.appspot.com",
  messagingSenderId: "57273300123",
  appId: "1:57273300123:web:83f8001041c735e489023e",
  measurementId: "G-JFC3Q44V9H"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

async function loginWithGoogle() {
	try {
			const provider = new GoogleAuthProvider();
			const auth = getAuth();

			const { user } = await signInWithPopup(auth, provider);

			return { uid: user.uid, displayName: user.displayName };
	} catch (error) {
			if (error.code !== 'auth/cancelled-popup-request') {
					console.error(error);
			}

			return null;
	}
}

async function sendMessage(roomId, user, text) {
	try {
			await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
					uid: user.uid,
					displayName: user.displayName,
					text: text.trim(),
					timestamp: serverTimestamp(),
			});
	} catch (error) {
			console.error(error);
	}
}

const getMessages = (roomId, callback) => {
	return onSnapshot(
			query(
					collection(db, 'chat-rooms', roomId, 'messages'),
					orderBy('timestamp', 'asc')
			),
			(querySnapshot) => {
					const messages = querySnapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
					}));
					callback(messages);
			}
	);
}

export { loginWithGoogle, sendMessage, getMessages };
