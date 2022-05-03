import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

import {
    AnyAction,
    combineReducers,
    configureStore,
    // createSelector,
    getDefaultMiddleware
} from '@reduxjs/toolkit';

// import menuReducer from './menuSlice';
import uiReducer from './uiSlice';
// import userReducer from './userSlice';

const combinedReducer = combineReducers({
    ui: uiReducer
});

// export type RootState = ReturnType<typeof combinedReducer>;
// export type AppDispatch = typeof store.dispatch;

// export const useAppSelector: TypedUseSelectorHook = useSelector;
export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();

const rootReducer = (state, action) => {
    if (action.type === 'user/logout') {
        state = undefined;
    }
    return combinedReducer(state, action);
};

const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()]
});

// // Selectors
// export const getDishesForCategorySelector = (category) => {
//     return createSelector(
//         [(state: RootState) => state.menu.dishList],
//         (items) => items.filter(x => x.category === category)
//     );
// };

// export const getCategoriesFromDishes = createSelector(
//     [(state: RootState) => state.menu.dishList],
//     (items) => [...items.reduce((a, x) => a.add(x.category), new Set())].sort()
// );

export default store;
