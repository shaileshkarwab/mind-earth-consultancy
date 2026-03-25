import axios from "axios";

/**
 * Central Axios instance for the MindEarth front-end.
 *
 * baseURL points to the Next.js proxy rewrite so every request is
 * forwarded server-side to the real API, avoiding browser CORS restrictions.
 */
const apis = axios.create({
  baseURL: "/api/proxy",
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request interceptor ──────────────────────────────────────────────────────
apis.interceptors.request.use(
  (config) => {
    // Attach auth token stored in localStorage (if any)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response interceptor ────────────────────────────────────────────────────
apis.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // Token expired or invalid — clear credentials and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    if (status === 403) {
      console.error("[API] Forbidden – insufficient permissions.");
    }

    if (status >= 500) {
      console.error("[API] Server error:", error?.response?.data);
    }

    return Promise.reject(error);
  },
);

export default apis;
