import { createSlice } from '@reduxjs/toolkit';
import { userDocRef } from '../firebase/controller';
import { updateDoc } from 'firebase/firestore';

const userAccountSlice = createSlice({
  name: 'userAccount',
  initialState: {
    uid: '',
    email: '',
    password: '',
    name: '',
    avatar: '',
  },
  reducers: {
    setActiveUser: (state, action) => {
      const { uid, email, password, name, avatar } = action.payload;
      return {
        uid,
        email,
        password,
        name,
        avatar,
      };
    },
    setUserLogOut: (state) => {
      state.uid = '';
      state.email = '';
      state.password = '';
      state.name = '';
      state.avatar = '';
    },
    changeUserInfo: (state, action) => {
      const { newInfo, userId } = action.payload;
      const { email, password, name, avatar } = newInfo;
      var docRef = userDocRef(userId);
      updateDoc(docRef, {
        accounts: newInfo,
      });
      return {
        uid: state.uid,
        email,
        password,
        name,
        avatar,
      };
    },
  },
});

// Export reducers
export const userAccountReducer = userAccountSlice.reducer;

export const { setActiveUser, setUserLogOut, changeUserInfo } = userAccountSlice.actions;
