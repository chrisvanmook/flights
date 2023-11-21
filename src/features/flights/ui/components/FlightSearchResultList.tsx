import { Flight } from "@/features/flights/types/flights";
import { FlightSearchResultListItem } from "@/features/flights/ui/components/FlightSearchResultListItem";
import { useMemo } from "react";

interface FlightSearchResultListProps {
  flights: Flight[];
}

interface GroupedFlights {
  [date: string]: Flight[];
}

const groupFlightsByDate = (flights: Flight[]): GroupedFlights => {
  return flights.reduce<GroupedFlights>((groupedFlights, flight) => {
    const { date } = flight;
    groupedFlights[date] = groupedFlights[date] || [];
    groupedFlights[date].push(flight);
    return groupedFlights;
  }, {});
};

const formatDateString = (dateString: string) => {
  const date = new Date(dateString);
  // Return as "Tuesday, 21 November"
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};

export const FlightSearchResultList = ({
  flights,
}: FlightSearchResultListProps) => {
  const groupedFlights = useMemo(() => groupFlightsByDate(flights), [flights]);

  return (
    <>
      {Object.entries(groupedFlights).map(([date, flights]) => (
        <div key={date}>
          <h3 className="font-bold mb-1">{formatDateString(date)}</h3>
          <ul>
            {flights.map((flight) => (
              <FlightSearchResultListItem
                key={flight.flightIdentifier}
                flight={flight}
              />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};
