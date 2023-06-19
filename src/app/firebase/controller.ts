import { db } from "./authSignIn";

// Get collection
export const userCollection = db.collection('users')
export const commentsCollection = db.collection('comments')
export const userDocRef = (uid : string) => userCollection.doc(uid)
export const commentsDocRef = (idMovie : string) => commentsCollection.doc(idMovie)