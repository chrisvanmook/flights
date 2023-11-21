import { createFlightsService, FlightsService } from "./flights-service";
import { FlightDateSortOrder } from "@/features/flights/types/options";
import { Flight } from "@/features/flights/types/flights";

describe("Flights Service", () => {
  let flightsService: FlightsService;

  beforeEach(() => {
    flightsService = createFlightsService();
  });

  describe("getFlights", () => {
    it("should return filtered flights based on airport name", async () => {
      const query = "san";
      const result = await flightsService.getFlights(
        query,
        FlightDateSortOrder.Descending,
      );

      const expectedAirportNames = [
        "San Francisco",
        "San Francisco",
        "Santiago Com",
        "Santiago",
        "Sandefjord",
      ];
      const expectedFilteredFlights = expect.arrayContaining(
        expectedAirportNames.map((airportName) =>
          expect.objectContaining({ airport: airportName }),
        ),
      );

      expect(result).toEqual(expectedFilteredFlights);
      expect(result.length).toEqual(5);
    });

    it("returns an empty array if query does not match", async () => {
      const query = "asd123";
      const result = await flightsService.getFlights(
        query,
        FlightDateSortOrder.Ascending,
      );

      expect(result).toEqual([]);
    });

    it("returns sorted flights based on date", async () => {
      const query = "san";
      const resultAscending = await flightsService.getFlights(
        query,
        FlightDateSortOrder.Ascending,
      );
      const resultDescending = await flightsService.getFlights(
        query,
        FlightDateSortOrder.Descending,
      );

      const sortByField = (a: Flight, b: Flight) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      };

      const expectedSortedFlightsAscending = resultAscending
        .slice()
        .sort(sortByField);
      const expectedSortedFlightsDescending = expectedSortedFlightsAscending
        .slice()
        .reverse();

      expect(resultAscending).toEqual(expectedSortedFlightsAscending);
      expect(resultDescending).toEqual(expectedSortedFlightsDescending);
    });
  });
});
