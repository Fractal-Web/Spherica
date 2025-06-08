import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appReducer from "./slice";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	devTools: true,
	reducer: {
		appReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
sagaMiddleware.run(rootSaga as any);

export const useStoreDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
