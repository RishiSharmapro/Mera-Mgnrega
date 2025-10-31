import axios from 'axios';
import { useQuery } from "@tanstack/react-query";

const useDistrictData = (selectedDistrict, fin_year, month, state) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  return useQuery({
    // cache key
    queryKey: ["districtData", fin_year, month, state, selectedDistrict],

    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/api/v1/mgnrega/${fin_year}/${selectedDistrict}/${state}`);
      const data = response.data.monthlyData;
      const summary = response.data.summary;

      for (const key in data) {
        if (data[key].month === month && data[key].fin_year === fin_year) {
          return { ...data[key], district: selectedDistrict, state, summary };
        }
      }
      return null;
    },

    // settings
    staleTime: 1000 * 60 * 10, // 10 mins - no refetch within this time
    cacheTime: 1000 * 60 * 60, // 1 hour cache in memory
    refetchOnWindowFocus: false, // no refetch when switching tabs
  });
};

export default useDistrictData;