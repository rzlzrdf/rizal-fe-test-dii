import { ColumnDef } from "@tanstack/react-table";
import { Patient } from "@/store/patientStore";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import dayjs from "dayjs";
import ActionColumn from "./action-column";

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "name",
    header: "Nama Petani",
    enableColumnFilter: true,
    enableSorting: true,
    cell: ({ row }) => {
      const { name } = row.original;
      return (
        <div className="font-semibold">{name}</div>
      );
    },
  },
  {
    accessorKey: "nik",
    header: "NIK",
    enableColumnFilter: true,
    enableSorting: true,
    cell: ({ row }) => {
      const { nik } = row.original;
      return (
        <div className="text-neutral-400">
          <span>{nik}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "date_in",
    header: "Tanggal Masuk",
    enableSorting: true,
    cell: ({ row }) => {
      const { date_in, room } = row.original;
      return (
        <div className="line-clamp-2">
          {dayjs(date_in).format("DD MMMM YYYY")}{" "}
          <p className="font-semibold">{room.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "diagnosis",
    header: "Diagnosa",
    size: 250,

    cell: ({ row }) => {
      const { diagnosis } = row.original;
      return <div className="text-sm line-clamp-2">{diagnosis}</div>;
    },
  },
  {
    accessorKey: "doctor",
    header: "Dokter",
    cell: ({ row }) => {
      const { doctor } = row.original;
      return <div className="line-clamp-1">{doctor.name}</div>;
    },
  },
  {
    header: "Aksi",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <ActionColumn id={id} />
      );
    },
  },
];
