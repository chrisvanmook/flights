import { FlightDateSortOrder } from "@/features/flights/types/options";
import { Button } from "@/features/common/ui/Button";

interface FlightSearchResultHeaderProps {
  onToggleSort: () => void;
  sortOrder: FlightDateSortOrder;
  disableSortButton: boolean;
}
export const FlightSearchResultHeader = ({
  onToggleSort,
  sortOrder,
  disableSortButton,
}: FlightSearchResultHeaderProps) => (
  <div className="flex justify-between mt-4 mb-8">
    <h2 className="text-3xl">Search Results</h2>
    <Button
      data-testid="flight-search-sort-button"
      type="button"
      onClick={onToggleSort}
      disabled={disableSortButton}
    >
      Sort on date (
      {sortOrder === FlightDateSortOrder.Ascending
        ? "upcoming first"
        : "past first"}
      )
    </Button>
  </div>
);
