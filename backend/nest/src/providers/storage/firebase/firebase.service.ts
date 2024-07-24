import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes
} from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import {
  getDatabase as getDb,
  ref as dbRef,
  set as dbSet,
  get as dbGet,
  child as dbChild,
  push,
  orderByChild,
  equalTo,
  remove as dbRemove,
  update as dbUpdate,
} from "firebase/database";

class FirebaseService {
  private appInstance;
  private dbInstance;
  private auth;
  private authDomain;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyDSqxC_xkmpFjeRg9yJMXp48rGzYmD8pFI",
      authDomain: "podcast-4073a.firebaseapp.com",
      projectId: "podcast-4073a",
      storageBucket: "podcast-4073a.appspot.com",
      messagingSenderId: "646206095901",
      appId: "1:646206095901:web:f7c10e06372ee02653fcf4",
      measurementId: "G-CY6CKNY1X1"
    };

    this.appInstance = initializeApp(firebaseConfig);
    this.dbInstance = getDb(this.appInstance);
    this.auth = getAuth(this.appInstance);
    this.authDomain = dbRef(this.dbInstance);
  }

  async uploadImageToFirebase(imageBuffer: Buffer, imageName: string, folderName: string): Promise<string> {
    try {
      const ext = imageName.split('.').pop()?.toLowerCase();
      const mimeType = ext ? `image/${ext === 'jpg' ? 'jpeg' : ext}` : 'image/jpeg';
  
      const storage = getStorage(this.appInstance);
      const storageRef = sRef(storage, `${folderName}/${imageName}`);
  
     
      await uploadBytes(storageRef, imageBuffer, { contentType: mimeType });
  
      const downloadURL = await getDownloadURL(storageRef);
  
      return downloadURL;
    } catch (error) {
      console.error('Error updating image in Firebase:', error);
      throw error;
    }
  }
  async uploadAudioToFirebase(audioBuffer: Buffer, audioName: string, folderName: string): Promise<string> {
    try {
      const ext = audioName.split('.').pop()?.toLowerCase();
      const mimeType = ext ? `audio/${ext}` : 'audio/mpeg';
  
      const storage = getStorage(this.appInstance);
      const storageRef = sRef(storage, `${folderName}/${audioName}`);
  
      const uploadTaskSnapshot = await uploadBytesResumable(storageRef, audioBuffer, { contentType: mimeType });
  
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
  
      return downloadURL;
    } catch (error) {
      console.error('Error uploading audio to Firebase:', error);
      throw error;
    }
  }
  


}

export default FirebaseService;
