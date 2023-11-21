import { FlightSearch } from "@/features/flights/ui/components/FlightSearch";

export default function FlightsPage() {
  return (
    <main className="flex items-center min-h-screen flex-col px-4 pt-6 xl:pt-24">
      <div className="max-w-5xl w-full">
        <FlightSearch />
      </div>
    </main>
  );
}
