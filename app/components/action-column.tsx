"use client";

import { Button } from "@/components/ui/button";
import { usePatientStore } from "@/store/patientStore";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  id: string;
};

const ActionColumn: React.FC<Props> = ({ id }) => {
  const { deletePatient } = usePatientStore();
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => deletePatient(id)}
        variant="destructive"
        size="icon"
      >
        <Trash />
      </Button>
    </div>
  );
};

export default ActionColumn;
