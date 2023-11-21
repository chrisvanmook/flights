import { FlightDateSortOrder } from "@/features/flights/types/options";
import { FlightsService } from "@/features/flights/data/flights-service";
import { DEFAULT_SORT, MAX_RESULTS } from "@/features/flights/config";

// Business rules here in use-case
export const createGetFlights =
  (flightsService: FlightsService) =>
  async (q: string, sort: FlightDateSortOrder = DEFAULT_SORT) => {
    const allFlights = await flightsService.getFlights(q, sort);

    return allFlights.slice(0, MAX_RESULTS);
  };
