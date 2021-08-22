import { createSlice } from '@reduxjs/toolkit';

let darkThemeLocalStorage;
const localStroageDarkmode = localStorage.getItem('darkmode');

// Set darkTheme from localStorage, defaults to false (light theme)
localStroageDarkmode === 'true'
    ? darkThemeLocalStorage = true
    : darkThemeLocalStorage = false;

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        // mobileMainDrawerOpen: false,
        // addOrderDialogOpen: false,
        darkTheme: darkThemeLocalStorage
    },
    reducers: {
        setDarkTheme: (state, action) => {
            state.darkTheme = action.payload.darkTheme;
        }
    }
});

// Action creators are generated for each case reducer function
export const { setDarkTheme } = uiSlice.actions;

export default uiSlice.reducer;
