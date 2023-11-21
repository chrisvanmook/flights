interface FlightSearchInputProps {
  onChange: (value: string) => void;
  searchQuery: string;
}

const LABEL = "Type in your destination";
export const FlightSearchInput = ({
  onChange,
  searchQuery,
}: FlightSearchInputProps) => (
  <input
    data-testid="flight-search-input"
    aria-label={LABEL}
    type="text"
    placeholder={LABEL}
    className="p-4 mb-4 border-b border-solid border-b-[--afternoon-blue] hover:drop-shadow-xl transition-all duration-200 ease-in-out"
    name="query"
    value={searchQuery}
    onChange={(event) => onChange(event.target.value)}
  />
);
