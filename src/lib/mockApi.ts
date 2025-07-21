import { Site } from "./PowerUpContext";

export function fetchSite(stationId: string): Promise<Site> {
  // Check if station belongs to Hypercharge North Vancouver
  const isHyperchargeNorthVan = ["2222", "2223", "2224"].includes(stationId);
  
  if (isHyperchargeNorthVan) {
    // Hypercharge North Vancouver site
    const hasAssigned = stationId === "2222";
    return Promise.resolve({
      id: "SITE-HCNV",
      name: "Hypercharge North Vancouver",
      address: "456 Lonsdale Ave, North Vancouver, BC",
      stations: ["2222", "2223", "2224"],
      panels: hasAssigned
        ? [
            {
              id: "",
              location: "",
              circuits: [
                {
                  id: "",
                  breaker: 40,
                  continuous: 32,
                  stations: [
                    { id: "2222", online: true },
                    { id: "2223", online: false },
                  ],
                },
              ],
            },
          ]
        : [],
    });
  } else {
    // Default demo site for other station IDs
    const hasAssigned = stationId === "1234";
    return Promise.resolve({
      id: "SITE-123",
      name: "Demo Mall",
      address: "123 Main St, Vancouver",
      stations: ["1234", "5678", "9012"],
      panels: hasAssigned
        ? [
            {
              id: "",
              location: "",
              circuits: [
                {
                  id: "",
                  breaker: 40,
                  continuous: 32,
                  stations: [
                    { id: "1234", online: true },
                    { id: "5678", online: false },
                  ],
                },
              ],
            },
          ]
        : [],
    });
  }
}

// submitPowerUp moved to dedicated file: submitPowerUp.ts 