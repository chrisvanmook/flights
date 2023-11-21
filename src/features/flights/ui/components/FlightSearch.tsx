"use client";

import { useState } from "react";
import { FlightSearchInput } from "@/features/flights/ui/components/FlightSearchInput";
import { useFetchFlights } from "@/features/flights/ui/hooks/useFetchFlights";
import { FlightSearchResultList } from "@/features/flights/ui/components/FlightSearchResultList";
import { FlightDateSortOrder } from "@/features/flights/types/options";
import { DEFAULT_SORT, MIN_QUERY_LENGTH } from "@/features/flights/config";
import { FlightSearchResultHeader } from "@/features/flights/ui/components/FlightSearchResultHeader";
import { FlightSearchShimmer } from "@/features/flights/ui/components/FlightSearchShimmer";

export const FlightSearch = () => {
  const { onLoad, flights, isLoading, error } = useFetchFlights();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<FlightDateSortOrder>(DEFAULT_SORT);

  const onChange = async (searchQuery: string) => {
    setSearchQuery(searchQuery);
    await loadFlights(searchQuery);
  };

  const onToggleSort = async () => {
    const newSortOrder =
      sortOrder === FlightDateSortOrder.Ascending
        ? FlightDateSortOrder.Descending
        : FlightDateSortOrder.Ascending;

    setSortOrder(newSortOrder);
    await loadFlights(searchQuery, newSortOrder);
  };

  const loadFlights = async (
    searchQuery: string,
    sort: FlightDateSortOrder = sortOrder,
  ) => {
    await onLoad(searchQuery, sort);
  };

  const showResults = !!(flights.length && !isLoading && !error);
  const disableSortButton = isLoading || flights.length === 0;
  const hasSearchQuery = !!(
    searchQuery &&
    searchQuery.length < MIN_QUERY_LENGTH &&
    !isLoading
  );
  const hasNoResults = !!(!showResults && searchQuery && !isLoading);

  return (
    <>
      <h1 className="text-3xl md:text-5xl bg-gradient-flights font-bold gradient-flights mb-3 pb-2 bg-clip-text text-transparent left-0 left">
        Find a departing flight
      </h1>
      <div className="z-10  w-full items-center justify-between text-sm lg:flex">
        <div className="flex flex-col w-full">
          <FlightSearchInput onChange={onChange} searchQuery={searchQuery} />
          <FlightSearchResultHeader
            sortOrder={sortOrder}
            onToggleSort={onToggleSort}
            disableSortButton={disableSortButton}
          />
          {isLoading && <FlightSearchShimmer />}
          {showResults ? (
            <FlightSearchResultList flights={flights} />
          ) : hasSearchQuery ? (
            <p>Please make sure you entered at least 3 characters</p>
          ) : hasNoResults ? (
            <p>No results found </p>
          ) : (
            !isLoading && <p>Please enter your destination</p>
          )}
          {/* move to separate error message component (left out of scope for now) */}
          {error && (
            <p
              style={{
                color: "var(--dark-red)",
              }}
            >
              {error.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
