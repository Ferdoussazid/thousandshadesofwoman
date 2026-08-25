import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/products";
import type { AgeGroup, Product } from "@/lib/types";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const ageGroup = (params.get("age_group") as AgeGroup | null) ?? undefined;
  const category = (params.get("category") as Product["category"] | null) ?? undefined;
  const featuredParam = params.get("featured");
  const featured = featuredParam === null ? undefined : featuredParam === "true";

  const products = await getProducts({ ageGroup, category, featured });
  return NextResponse.json({ products });
}
