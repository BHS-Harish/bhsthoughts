import { createSlice } from '@reduxjs/toolkit';
const AuthSlice = createSlice({
    name: "Auth",
    initialState: {
        isAuthenticated: false,
        authenticatedUser: {}
    },
    reducers: {
        updateLoggedIn(state, action) {
            return {
                ...state,
                isAuthenticated: !state.isAuthenticated,
                authenticatedUser: action.payload
            }
        },
        updateLoggedOut(state) {
            return {
                ...state,
                isAuthenticated: !state.isAuthenticated,
                authenticatedUser: null
            }
        }
    }
})
export const { updateLoggedIn, updateLoggedOut } = AuthSlice.actions;
export default AuthSlice.reducer;