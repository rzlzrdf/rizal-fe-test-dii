"use client";

import { PatientStore, createPatientStore } from "@/store/patientStore";
import { createContext, useContext, useRef } from "react";
import { StoreApi, useStore } from "zustand";

export type PatientStoreApi = StoreApi<PatientStore>;

// CEKK

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
    storeRef.current = createPatientStore();
  }
  return (
    <PatientStoreContext.Provider value={storeRef.current}>
      {children}
    </PatientStoreContext.Provider>
  );
};

export const usePatientStoreContext = <T,>(
    selector: (store: PatientStore) => T,
  ): T => {
    const patientStoreContext = useContext(PatientStoreContext)
  
    if (!patientStoreContext) {
      throw new Error(`usePatientStoreContext must be used within PatientProvider`)
    }
  
    return useStore(patientStoreContext, selector)
  }
