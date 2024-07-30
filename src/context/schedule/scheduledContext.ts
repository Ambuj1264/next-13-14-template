"use client";

import { IScheduler } from "@/types/global";
import React, { useContext } from "react";

export const ScheduledContextContext = React.createContext({} as IScheduler);
export const ScheduledContextContainer = ScheduledContextContext.Provider;
export const useScheduledContext = () => useContext(ScheduledContextContext);
