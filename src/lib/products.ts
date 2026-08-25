import { PRODUCTS } from "./data";
import { getSupabase } from "./supabase";
import type { AgeGroup, Product } from "./types";

export interface ProductFilters {
  ageGroup?: AgeGroup;
  category?: Product["category"];
  featured?: boolean;
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const supabase = getSupabase();
  if (supabase) {
    let query = supabase.from("products").select("*").order("price");
    if (filters.ageGroup) query = query.eq("age_group", filters.ageGroup);
    if (filters.category) query = query.eq("category", filters.category);
    if (filters.featured !== undefined) query = query.eq("featured", filters.featured);
    const { data, error } = await query;
    if (!error && data) return data as Product[];
  }
  return PRODUCTS.filter(
    (p) =>
      (!filters.ageGroup || p.age_group === filters.ageGroup) &&
      (!filters.category || p.category === filters.category) &&
      (filters.featured === undefined || p.featured === filters.featured)
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (!error && data) return data as Product;
  }
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}
