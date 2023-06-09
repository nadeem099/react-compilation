import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import Register from "./topics/Authentication/Register";
import Login from "./topics/Authentication/Login";
import Users from "./topics/Authentication/Users";
import { AuthContextProvider } from "./topics/Authentication/AuthContext";
import PrivateRoute from "./topics/Authentication/PrivateRoute";
import Form from "./topics/MultiStepForm";
import Pagination from "./topics/pagination/Pagination";
import TypeSafeFunctional from "./topics/TypeSafety/TypeSafeFunctional";
import { TweetsWithRedux, TweetsWithRTK } from "./topics/redux-toolkit";
import store from "./topics/redux-toolkit/rtk/store";
import BaseButton from "./topics/styled-component/BaseButton";
import { PrimaryButton } from "./topics/styled-component/PrimaryButton";
import { StyledBaseButton } from "./topics/styled-component/DummyButton";
import { IconPrimayButton } from "./topics/styled-component/IconPrimaryButton";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<Form />} />
        <Route path="/form/:stepId" element={<Form />} />
        <Route path="/pagination" element={<Pagination />}>
          <Route path="/pagination/:pageId" element={<Pagination />} />
        </Route>
        <Route path="typesafe" element={<TypeSafeFunctional name="Nadeem" />} />
        <Route
          path="/tweets"
          element={
            <Provider store={store}>
              <TweetsWithRTK />
            </Provider>
          }
        />
        <Route
          path="styling"
          element={
            <>
              <BaseButton>BaseButton</BaseButton>
              <PrimaryButton variant="primary" xl>
                Primary Button
              </PrimaryButton>
              <IconPrimayButton icon="location">
                Icon Primary Button
              </IconPrimayButton>
              <StyledBaseButton>Dummy Button</StyledBaseButton>
            </>
          }
        />
      </Routes>
      <PrivateRoute path="/users" component={Users} />
    </BrowserRouter>
  </AuthContextProvider>
  // </React.StrictMode>
);
