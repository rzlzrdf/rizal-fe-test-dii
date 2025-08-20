"use client";

import { PatientStore, usePatientStore } from "@/store/patientStore";
import { createContext, useContext, useRef } from "react";
import { StoreApi, useStore } from "zustand";

export type PatientStoreApi = StoreApi<PatientStore>;

export const PatientStoreContext = createContext<PatientStoreApi | undefined>(
  undefined
);

export const PatientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storeRef = useRef<PatientStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = usePatientStore;
  }
  return (
    <PatientStoreContext.Provider value={storeRef.current}>
      {children}
    </PatientStoreContext.Provider>
  );
};

export const useCounterStore = <T,>(
    selector: (store: PatientStore) => T,
  ): T => {
    const patientStoreContext = useContext(PatientStoreContext)
  
    if (!patientStoreContext) {
      throw new Error(`useCounterStore must be used within CounterStoreProvider`)
    }
  
    return useStore(patientStoreContext, selector)
  }
