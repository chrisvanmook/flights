import { createGetFlights } from "./getFlights";
import { flightsService } from "@/features/flights/data";

export const getFlights = createGetFlights(flightsService);
