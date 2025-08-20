export type DoctorType = {
  id: number;
  name: string;
  specialization: string;
};

export type RoomType = {
  id: number;
  name: string;
};

export const doctors: DoctorType[] = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialization: "Cardiologist",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialization: "Pediatrician",
  },
  {
    id: 3,
    name: "Dr. Jim Beam",
    specialization: "Neurologist",
  },
  {
    id: 4,
    name: "Dr. John Doe",
    specialization: "Cardiologist",
  },
  {
    id: 5,
    name: "Dr. John Doe",
    specialization: "Cardiologist",
  },
  {
    id: 6,
    name: "Dr. John Doe",
    specialization: "Cardiologist",
  },
];

export const rooms: RoomType[] = [
  {
    id: 101,
    name: "Room 101",
  },
  {
    id: 102,
    name: "Room 102",
  },
  {
    id: 103,
    name: "Room 103",
  },
  {
    id: 104,
    name: "Room 104",
  },
  {
    id: 105,
    name: "Room 105",
  },
  {
    id: 106,
    name: "Room 106",
  },
];