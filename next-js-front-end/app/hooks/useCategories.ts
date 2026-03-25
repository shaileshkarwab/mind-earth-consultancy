import { useState, useEffect } from "react";
import { getAllCategories } from "../services/categoryService";
import type { NavCategory } from "../types/category";

export function useCategories() {
  const [categories, setCategories] = useState<NavCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch(() => setError("Failed to load categories"))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}
