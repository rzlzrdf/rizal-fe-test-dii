"use client";

import { Button } from "@/components/ui/button";
import { usePatientStore } from "@/store/patientStore";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
};

const ActionColumn: React.FC<Props> = ({ id }) => {
  const { deletePatient } = usePatientStore();
  return (
    <div className="flex items-center gap-2">
      <Link href={`/register/${id}`}>
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      </Link>
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
