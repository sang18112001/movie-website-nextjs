import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import React from 'react';
import { useEffect, useState } from 'react';
import { userCollection } from '../firebase/controller';

const useWishlist = () => {
  // setDoc(cityRef, { capital: true }, { merge: true });
  const [users, setUsers] = useState({});
  useEffect(
    () =>
      onSnapshot(userCollection, (snapshot: QuerySnapshot<DocumentData>) => {
        setUsers(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }),
        );
      }),
    [],
  );
  return [users, setUsers]
};

export default useWishlist;
