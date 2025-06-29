import { useEffect, useState } from "react";
import "./App.css";
import { useAuthStore } from "./store/useAuthStore";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./page/loginPage";
import HomePage from "./page/HomePage";
import { Toaster } from "react-hot-toast";
import Layout from "./layout/Layout";
import SignupPage from "./page/SignupPage";
import BookDetail from "./components/BookDetail";
import PlaceOrder from "./components/PlaceOrder";
import OrderPage from "./page/OrderPage";
import OrderDetailPage from "./page/OrderDetailPage";
import BookDetailPage from "./page/BookDetailPage";
import AllReviews from "./components/AllReviews";

function App() {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/auth/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/auth/login" />}
          />

          <Route
            path="/books/:id"
            element={
              authUser ? <BookDetail /> : <Navigate to={"/auth/login"} />
            }
          />

          <Route
            path="/orders/:id"
            element={authUser ? <PlaceOrder /> : <Navigate to="/auth/login" />}
          />

          <Route path="/orders" element={<OrderPage />}/>

          <Route path="/orders/orderDetail/:id" element={<OrderDetailPage />} />

          <Route path="/books/:id/reviews" element={<BookDetailPage />} />

          <Route path="/reviews/:id/reviews" element={<AllReviews />} />  
        </Route>

        <Route
          path="/auth/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
