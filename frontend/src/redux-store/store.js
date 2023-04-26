import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    name: '',
    email: '',
    googleId: '',
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.googleId = action.payload.googleId;
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('name', action.payload.name);
      localStorage.setItem('email', action.payload.email);
      localStorage.setItem('googleId', action.payload.googleId);
    },
    setUserLogout: (state) => {
      state.isLoggedIn = false;
      state.name = '';
      state.email = '';
      state.googleId = '';
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('googleId');
    },
  },
});

const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
const storedName = localStorage.getItem('name');
const storedEmail = localStorage.getItem('email');
const storedGoogleId = localStorage.getItem('googleId');

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  preloadedState: {
    user: {
      isLoggedIn: storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false,
      name: storedName || '',
      email: storedEmail || '',
      googleId: storedGoogleId || '',
    },
  },
});

export const { setUserLogin, setUserLogout } = userSlice.actions;

export default store;
