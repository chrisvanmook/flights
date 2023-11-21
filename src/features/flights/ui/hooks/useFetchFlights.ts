import { FlightDateSortOrder } from "@/features/flights/types/options";
import { Flight } from "@/features/flights/types/flights";
import { useState } from "react";
import { MIN_QUERY_LENGTH } from "@/features/flights/config";
const GENERIC_ERROR = new Error("Something went wrong");

export const useFetchFlights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Performance nice to have: debounce this function
  const onLoad = async (searchQuery: string, sort: FlightDateSortOrder) => {
    setError(null);
    setIsLoading(true);
    if (searchQuery.length < MIN_QUERY_LENGTH) {
      setFlights([]);
      setIsLoading(false);
      return;
    }
    await fetch(`/api?query=${searchQuery}&sort=${sort}`)
      .then((response) => {
        // Handle client side errors
        if (!response.ok) {
          // create different type of errors if necessary, for now just use a generic error
          throw GENERIC_ERROR;
        }
        return response.json();
      })
      .then((flights: Flight[]) => {
        setFlights(flights);
      })
      .catch(() => {
        setError(GENERIC_ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    onLoad,
    error,
    isLoading,
    flights,
  };
};
