"use client";

import React, { useContext } from "react";

export const QueryContext = React.createContext({} as any);
export const QueryContextContainer = QueryContext.Provider;
export const useQueryContext = () => useContext(QueryContext);
