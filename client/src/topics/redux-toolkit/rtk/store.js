import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./features/comments";
import entitiesReducer from "./features/entities";
import { logger } from "redux-logger";

const store = configureStore({
  reducer: {
    comments: commentsReducer,
    entities: entitiesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
