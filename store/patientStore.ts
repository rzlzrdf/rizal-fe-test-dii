import { create } from "zustand";

export type Patient = {
    id: string;
    name: string;
    nik: string;
    diagnosis: string;
    date_in: string;
    doctor: {
        id: string;
        name: string;
        specialization: string;
    }
    room: {
        id: string;
        name: string;
    }
}

export type PatientAction = {
    addPatient: (patient: Patient) => void;
    updatePatient: (patient: Patient) => void;
    deletePatient: (id: string) => void;
}

export type PatientStore = {
    patients: Patient[];
} & PatientAction;

export const createPatientStore = () => create<PatientStore>((set) => ({
    patients: [],
    addPatient: (patient) => set((state) => ({ patients: [...state.patients, patient] })),
    updatePatient: (patient) => set((state) => ({ patients: state.patients.map((p) => p.id === patient.id ? patient : p) })),
    deletePatient: (id) => set((state) => ({ patients: state.patients.filter((p) => p.id !== id) })),
}));

export const usePatientStore = createPatientStore();

