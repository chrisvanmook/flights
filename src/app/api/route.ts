import { NextRequest, NextResponse } from "next/server";
import { getFlights } from "./use-cases";
import { MIN_QUERY_LENGTH } from "@/features/flights/config";
import { FlightDateSortOrder } from "@/features/flights/types/options";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") ?? undefined;
  const sort = searchParams.get("sort") ?? undefined;
  if (!query) {
    return NextResponse.json(
      {
        error: "Query is required.",
      },
      {
        status: 400,
      },
    );
  }

  if (query.length < MIN_QUERY_LENGTH) {
    return NextResponse.json(
      {
        error: "Input length should be greater than 2 characters.",
      },
      {
        status: 400,
      },
    );
  }

  const sortOrder = Object.values(FlightDateSortOrder).includes(
    sort as FlightDateSortOrder,
  )
    ? (sort as FlightDateSortOrder)
    : undefined;

  const res = await getFlights(query, sortOrder);
  return Response.json(res);
};
