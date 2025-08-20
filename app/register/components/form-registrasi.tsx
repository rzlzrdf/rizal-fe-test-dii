"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { doctors, rooms } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePatientStore } from "@/store/patientStore";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  nik: z.string().min(1, {
    message: "NIK is required",
  }),
  diagnosis: z.string().min(1, {
    message: "Diagnosis is required",
  }),
  date_in: z.date(),
  doctor: z.string().min(1, {
    message: "Doctor is required",
  }),
  room: z.string().min(1, {
    message: "Room is required",
  }),
});

type FormRegistrasi = z.infer<typeof formSchema>;

const FormRegistrasi = () => {
  const { addPatient } = usePatientStore();
  const router = useRouter();
  const form = useForm<FormRegistrasi>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nik: "",
      diagnosis: "",
      date_in: new Date(),
      doctor: "",
      room: "",
    },
  });

  const onSubmit = (data: FormRegistrasi) => {
    setTimeout(() => {
      addPatient({
        id: crypto.randomUUID(),
        name: data.name,
        nik: data.nik,
        diagnosis: data.diagnosis,
        date_in: dayjs(data.date_in).format("YYYY-MM-DD"),
        doctor: doctors.find((doctor) => doctor.id.toString() === data.doctor)!,
        room: rooms.find((room) => room.id.toString() === data.room)!,
      });
      toast.success("Pasien berhasil didaftarkan");
      form.reset();
      router.push("/");
    }, 500);
  };

  return (
    <Card className="mt-10 bg-white max-w-full overflow-hidden">
      <CardHeader className="border-b">
        <CardTitle>Register Pasien</CardTitle>
        <CardDescription>
          Silahkan isi form dibawah ini untuk mendaftar pasien baru
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Masukkan Nama Pasien" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nik"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIK</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Masukkan NIK Pasien" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diagnosis</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="col-span-2"
                        placeholder="Masukkan Diagnosis"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full grid lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date_in"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Masuk</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value}
                          onDateChange={field.onChange}
                          placeholder="Pilih tanggal masuk"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="doctor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dokter</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value ?? ""}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full overflow-hidden">
                            <SelectValue placeholder="Pilih Dokter" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {doctors.map((doctor) => (
                            <SelectItem
                              key={doctor.id}
                              value={doctor.id.toString()}
                            >
                              {doctor.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="room"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kamar</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? ""}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full overflow-hidden">
                          <SelectValue placeholder="Pilih ruangan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        {rooms.map((room) => (
                          <SelectItem key={room.id} value={room.id.toString()}>
                            {room.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="bg-teal-600">
              Registrasikan Pasien
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormRegistrasi;
