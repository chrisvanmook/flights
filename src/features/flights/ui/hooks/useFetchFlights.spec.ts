import { renderHook, act } from "@testing-library/react";
import { useFetchFlights } from "./useFetchFlights";
import { FlightDateSortOrder } from "@/features/flights/types/options";

describe("useFetchFlights", () => {
  const mockFetchResponse = (status: number, data: object) =>
    Promise.resolve({
      ok: status === 200,
      json: () => Promise.resolve(data),
    });

  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock as unknown as typeof global.fetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("fetches flights and sets state accordingly", async () => {
    const { result } = renderHook(() => useFetchFlights());

    const mockFlights = [
      {
        flightIdentifier: "ABC123",
      },
    ];

    fetchMock.mockImplementation((url: string | string[]) => {
      if (url.includes("/api")) {
        return mockFetchResponse(200, mockFlights);
      }
      return Promise.reject(new Error("Unhandled fetch call"));
    });

    await act(async () => {
      await result.current.onLoad("searchQuery", FlightDateSortOrder.Ascending);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.flights).toEqual(mockFlights);
  });

  it("handles client-side errors correctly", async () => {
    const { result } = renderHook(() => useFetchFlights());

    fetchMock.mockRejectedValue(new Error("Client-side error")); // Simulate a client-side error

    await act(async () => {
      await result.current.onLoad("searchQuery", FlightDateSortOrder.Ascending);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toEqual(new Error("Something went wrong"));
    expect(result.current.flights).toEqual([]);
  });
});
