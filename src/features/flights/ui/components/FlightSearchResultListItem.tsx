import { Flight } from "@/features/flights/types/flights";

interface FlightSearchResultListItemProps {
  flight: Flight;
}

export const FlightSearchResultListItem = ({
  flight: { airport, url, flightNumber, expectedTime, originalTime },
}: FlightSearchResultListItemProps) => {
  const isTimeDifferent = expectedTime !== originalTime;
  return (
    <li className="mb-4" data-testid="flight-search-listitem">
      <a
        className="flex gap-3 bg-white p-2 shadow-sm hover:shadow-lg"
        href={`https://www.schiphol.com${url}`}
        target="_blank"
        aria-label={`Flight to ${airport} with flight number ${flightNumber} from ${
          isTimeDifferent ? expectedTime : originalTime
        }`}
      >
        <div className="font-bold flex flex-col basis-1/4">
          {isTimeDifferent ? (
            <>
              <span className="line-through">{originalTime}</span>
              <span>{expectedTime}</span>
            </>
          ) : (
            originalTime
          )}
        </div>
        <div className="flex flex-col basis-2/4">
          <span className="font-bold">{airport}</span>
          <span>{flightNumber}</span>
        </div>
        <div className="flex flex-col flex-grow items-end justify-center">
          {/* consider creating a link-like component */}
          <div className="flex items-center gap-1 text-[--afternoon-blue]">
            <span className="">Details</span>
            <svg
              aria-hidden="true"
              className="rw-icon rw-icon--arrow-right"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentcolor"
                d="M12 6.3l-1.4 1.5 3.2 3.2H6v2h7.8l-3.2 3.2 1.4 1.5 5.7-5.7L12 6.3z"
              ></path>
            </svg>
          </div>
        </div>
      </a>
    </li>
  );
};
