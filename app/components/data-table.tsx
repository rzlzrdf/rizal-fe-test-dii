"use client";

import { usePatientStore } from "@/store/patientStore";
import React from "react";

const DataTable = () => {
  const { patients } = usePatientStore();
  
  return (
    <div>
      {patients.map((patient) => (
        <div key={patient.id}>
          <p>{patient.name}</p>
          <p>{patient.nik}</p>
          <p>{patient.date_in}</p>
          <p>{patient.diagnosis}</p>
          <p>{patient.doctor.name}</p>
          <p>{patient.room.name}</p>
        </div>
      ))}
    </div>
  );
};

export default DataTable;
