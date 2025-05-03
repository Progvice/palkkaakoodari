// hooks/useSearchEmployees.ts
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchEmpoyees } from "../api/auth/employees";
import queryKeys from "../constants/queryKeys";
import { Employee } from "../types";

type useSearchEmployeesType = {
  searchVisible: boolean,
  data: Employee[] | undefined,
  isLoading: boolean,
  setSearchVisible: (val: boolean) => void
};

const useSearchEmployees  = (searchVal: string) : useSearchEmployeesType => {
  const [searchVisible, setSearchVisible] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: [queryKeys.searchEmployees, searchVal],
    queryFn: async () => searchEmpoyees(searchVal),
    enabled: searchVal.length > 0,
  });

  useEffect(() => {
    if (searchVal.length > 0) {
      setSearchVisible(true);
      refetch();
    } else {
      setSearchVisible(false);
    }
  }, [searchVal, refetch]);

  return {
    searchVisible,
    data,
    isLoading,
    setSearchVisible
  };
};

export default useSearchEmployees;
