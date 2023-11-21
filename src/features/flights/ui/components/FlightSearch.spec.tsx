import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { FlightSearch } from "./FlightSearch";
import * as useFetchFlightsHook from "@/features/flights/ui/hooks/useFetchFlights";

jest.mock("@/features/flights/ui/hooks/useFetchFlights");

const useFetchFlightsMock =
  useFetchFlightsHook.useFetchFlights as jest.MockedFunction<
    typeof useFetchFlightsHook.useFetchFlights
  >;

const FLIGHT_SEARCH_INPUT_TEST_ID = "flight-search-input";
const FLIGHT_SEARCH_SORT_TEST_ID = "flight-search-sort-button";
const FLIGHT_SEARCH_LIST_ITEM_TEST_ID = "flight-search-listitem";

describe("FlightSearch Component", () => {
  it("renders FlightSearch component correctly", () => {
    useFetchFlightsMock.mockImplementation(() => ({
      onLoad: jest.fn(),
      flights: [],
      isLoading: false,
      error: null,
    }));
    render(<FlightSearch />);

    expect(
      screen.getByText("Please enter your destination"),
    ).toBeInTheDocument();
  });

  it("updates search query and fetches flights on search input change", async () => {
    const onLoadMockFn = jest.fn();
    useFetchFlightsMock.mockImplementation(() => ({
      onLoad: onLoadMockFn,
      flights: [],
      isLoading: false,
      error: null,
    }));

    render(<FlightSearch />);
    const input = screen.getByTestId<HTMLInputElement>(
      FLIGHT_SEARCH_INPUT_TEST_ID,
    );

    fireEvent.change(input, { target: { value: "san" } });

    expect(input.value).toBe("san");

    expect(onLoadMockFn).toHaveBeenNthCalledWith(1, "san", "descending");
  });

  it("toggles flight sorting order on sort button click", async () => {
    const onLoadMockFn = jest.fn();
    useFetchFlightsMock.mockImplementation(() => ({
      onLoad: onLoadMockFn,
      flights: [],
      isLoading: false,
      error: null,
    }));
    const { rerender } = render(<FlightSearch />);
    const input = screen.getByTestId(FLIGHT_SEARCH_INPUT_TEST_ID);

    fireEvent.change(input, { target: { value: "san" } });

    expect(onLoadMockFn).toHaveBeenNthCalledWith(1, "san", "descending");

    const sortButton = screen.getByTestId(FLIGHT_SEARCH_SORT_TEST_ID);
    expect(sortButton).toBeDisabled();

    // Should now be enabled with results
    useFetchFlightsMock.mockImplementation(() => ({
      onLoad: onLoadMockFn,
      flights: [
        {
          flightIdentifier: "D20190401UA969",
          flightNumber: "UA 969",
          airport: "San Francisco",
          date: "2022-02-23",
          expectedTime: "14:50",
          originalTime: "14:50",
          url: "/en/departures/flight/D20190401UA969/",
          score: "70.55272",
        },
      ],
      isLoading: false,
      error: null,
    }));

    rerender(<FlightSearch />);

    expect(sortButton).not.toBeDisabled();

    fireEvent.click(sortButton);

    expect(onLoadMockFn).toHaveBeenNthCalledWith(2, "san", "ascending");
    await waitFor(() => {});
  });

  it("renders list of flights", async () => {
    useFetchFlightsMock.mockImplementation(() => ({
      onLoad: jest.fn(),
      flights: [
        {
          flightIdentifier: "D20190401UA969",
          flightNumber: "UA 969",
          airport: "San Francisco",
          date: "2022-02-23",
          expectedTime: "14:50",
          originalTime: "14:50",
          url: "/en/departures/flight/D20190401UA969/",
          score: "70.55272",
        },
        {
          flightIdentifier: "D20190401UA989",
          flightNumber: "UA 989",
          airport: "San Francisco",
          date: "2022-02-24",
          expectedTime: "14:50",
          originalTime: "14:50",
          url: "/en/departures/flight/D20190401UA989/",
          score: "71.53476",
        },
      ],
      isLoading: false,
      error: null,
    }));
    render(<FlightSearch />);
    const listItems = screen.getAllByTestId(FLIGHT_SEARCH_LIST_ITEM_TEST_ID);

    expect(listItems.length).toBe(2);

    listItems.map((listItem) => {
      expect(listItem).toBeInTheDocument();
    });
  });
});
