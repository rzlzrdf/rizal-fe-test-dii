"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type Props = {
  onSearch: (search: string) => void;
};

const SearchDebounced: React.FC<Props> = ({ onSearch }) => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <Input
      className="w-[200px] mb-5"
      placeholder="Cari Nama Pasien/NIK"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchDebounced;
