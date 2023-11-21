import { FlightDateSortOrder } from "../types/options";
import flightsFile from "./flights.json";
import { Flight } from "@/features/flights/types/flights";
import { createDateFromStrings } from "@/features/flights/data/utils/date";

export type FlightsService = ReturnType<typeof createFlightsService>;

const sortFlights = (flights: Flight[], sort: FlightDateSortOrder) => {
  return flights.sort((a, b) => {
    const aDate = createDateFromStrings(a.date, a.expectedTime);
    const bDate = createDateFromStrings(b.date, b.expectedTime);
    const timeComparison =
      sort === FlightDateSortOrder.Ascending
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();

    // If times are the same, sort by score
    return timeComparison !== 0
      ? timeComparison
      : Number(b.score) - Number(a.score);
  });
};

export const createFlightsService = () => {
  return {
    // This function mimics executing a (db) query on flights
    getFlights: (q: string, sort: FlightDateSortOrder): Promise<Flight[]> =>
      new Promise((resolve) => {
        // Build in delay to mimic fetching from a service
        setTimeout(() => {
          const sortedFlights = sortFlights(flightsFile.flights, sort);

          const result = q
            ? // Another option would be to use Fuse.js
              sortedFlights.filter((flight) =>
                flight.airport.toLocaleLowerCase().includes(q.toLowerCase()),
              )
            : sortedFlights;
          resolve(result);
          // error handling / logging (left out of scope for now)
        }, 1000);
      }),
  };
};
