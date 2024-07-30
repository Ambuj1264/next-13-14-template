"use client";
import AuthProvider from "@/context/auth/AuthProvider";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/graphql/apollo-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {children}
      </AuthProvider>
    </ApolloProvider>
  );
}
