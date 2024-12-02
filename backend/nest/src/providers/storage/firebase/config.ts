// import { Injectable } from '@nestjs/common';
// import * as admin from 'firebase-admin';
// var serviceAccount = require('./keyfirebase.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://podcast-4073a-default-rtdb.asia-southeast1.firebasedatabase.app/', 
// });

// @Injectable()
// export class FirebaseService {
//   private readonly firestore: FirebaseFirestore.Firestore;
//   private readonly realtimeDatabase: admin.database.Database;

//   constructor() {
//     this.firestore = admin.firestore();
//     this.realtimeDatabase = admin.database();
//   }

//   getFirestoreInstance(): FirebaseFirestore.Firestore {
//     return this.firestore;
//   }

//   getRealtimeDatabaseInstance(): admin.database.Database {
//     return this.realtimeDatabase;
//   }
// }
