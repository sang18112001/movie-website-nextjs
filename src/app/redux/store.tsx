import { configureStore } from '@reduxjs/toolkit';
import { setActiveUser, userAccountReducer } from './userSlice';
import { setUpWishlist, wishlistReducer } from './wishlistSlice';
import { commentReducer } from './commentSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { userDocRef } from '../firebase/controller';
import { ICommentsReducer, IUserReducer, IWishlistReducer } from '../utils/types';

export const store = configureStore({
  reducer: {
    userAccountReducer,
    wishlistReducer,
    commentReducer
  },
});

// Get user data
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  const uid = String(user?.uid);
  var docRef = userDocRef(String(uid));
  docRef.get().then((data) => {
    if (data.exists) {
      const wishlist = data.data()?.wishlist;
      const accounts = data.data()?.accounts;
      store.dispatch(setUpWishlist(wishlist.items));
      store.dispatch(
        setActiveUser({
          uid,
          email: accounts.email,
          password: accounts.password,
          name: accounts.name,
          avatar: accounts.avatar,
        }),
      );
    } else {
      console.log('No such document!');
    }
  });
});

export const getUser = (state: IUserReducer) => state.userAccountReducer;
export const getWishlist = (state: IWishlistReducer) => state.wishlistReducer;
export const getComments = (state: ICommentsReducer) => state.commentReducer;
export type AppDispatch = typeof store.dispatch