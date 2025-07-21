export async function apiFetch(url: string) {
  // Quick mock: if path starts with /site, return demo site; else success
  if (url.startsWith("/site")) {
    return {
      id: "SITE-123",
      name: "Demo Mall",
      address: "123 Main St, Vancouver",
      panels: [],
      stations: ["1234", "5678", "9012"],
    };
  }
  // POST /power-up success
  return { ok: true };
} 