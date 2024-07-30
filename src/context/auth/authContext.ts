"use client";

import { IAuth } from "@/types/global";
import React, { useContext } from "react";

export const AuthContext = React.createContext({} as IAuth);
export const AuthContextContainer = AuthContext.Provider;
export const useAuth = () => useContext(AuthContext);
