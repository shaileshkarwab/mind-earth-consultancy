import apis from "../lib/axiosInstance";
import type { ApiResponse } from "../types/api";
import type { NavCategory } from "../types/category";

export async function getAllCategories(): Promise<NavCategory[]> {
  const res = await apis.get<ApiResponse<NavCategory[]>>("/Category/v2");
  return res.data.data;
}
