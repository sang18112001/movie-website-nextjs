import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateDoc } from 'firebase/firestore';
import { userDocRef } from '../firebase/controller';

interface WishlistState {
  items: any[]; // Replace 'any' with the appropriate type for wishlist items
}

interface WishlistPayload {
  userId: string;
  id: string;
  path: string;
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  } as WishlistState,
  reducers: {
    setUpWishlist: (state, action: PayloadAction<any>) => {
      state.items = action.payload;
    },
    addToWishlist: (state, action: PayloadAction<any>) => {
      const { id, userId, path }: WishlistPayload = action.payload;
      state.items.push({ id, path });
      var docRef = userDocRef(userId);
      updateDoc(docRef, {
        wishlist: {
          items: [...state.items],
        },
      });
    },
    removeFromWishlist: (state, action: PayloadAction<any>) => {
      const newWishlist = [...state.items].filter((item) => item.id != action.payload.id);
      state.items = newWishlist;
      var docRef = userDocRef(action.payload.userId);
      updateDoc(docRef, {
        wishlist: {
          items: newWishlist,
        },
      });
    },
  },
});

export const wishlistReducer = wishlistSlice.reducer;
export const { addToWishlist, setUpWishlist, removeFromWishlist } = wishlistSlice.actions;
