// hooks/useSearchTeams.ts
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../constants/queryKeys";
import { Team } from "../types";
import { searchTeams } from "../api/auth/teams";

type useSearchTeamsType = {
  searchVisible: boolean,
  data: Team[] | undefined,
  isLoading: boolean,
  setSearchVisible: (val: boolean) => void
};

const useSearchTeams  = (searchVal: string) : useSearchTeamsType => {
  const [searchVisible, setSearchVisible] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: [queryKeys.searchTeams, searchVal],
    queryFn: async () => searchTeams(searchVal),
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

export default useSearchTeams;
