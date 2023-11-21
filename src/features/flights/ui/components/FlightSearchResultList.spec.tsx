import React from "react";
import { render, screen } from "@testing-library/react";
import { FlightSearchResultList } from "./FlightSearchResultList";
import { Flight } from "@/features/flights/types/flights";

jest.mock(
  "@/features/flights/ui/components/FlightSearchResultListItem",
  () => ({
    FlightSearchResultListItem: jest.fn(({ flight }) => (
      <li data-testid={`flight-${flight.flightIdentifier}`}>
        {flight.flightIdentifier}
      </li>
    )),
  }),
);

describe("FlightSearchResultList", () => {
  const flightsMock = [
    {
      flightIdentifier: "ABC123",
      date: "2023-11-20T08:00:00.000Z",
    },
    {
      flightIdentifier: "DEF456",
      date: "2023-11-21T12:00:00.000Z",
    },
  ];

  it("renders flights grouped by date with formatted date strings", () => {
    render(<FlightSearchResultList flights={flightsMock as Flight[]} />);

    const formattedDate1 = "Monday, 20 November";
    const formattedDate2 = "Tuesday, 21 November";

    expect(screen.getByText(formattedDate1)).toBeInTheDocument();
    expect(screen.getByText(formattedDate2)).toBeInTheDocument();

    const flightABC123 = screen.getByText("ABC123");
    const flightDEF456 = screen.getByText("DEF456");

    expect(flightABC123).toBeInTheDocument();
    expect(flightDEF456).toBeInTheDocument();

    const flightsForDate1 = screen.getAllByTestId("flight-ABC123");
    const flightsForDate2 = screen.getAllByTestId("flight-DEF456");

    expect(flightsForDate1.length).toBe(1);
    expect(flightsForDate2.length).toBe(1);
  });
});
