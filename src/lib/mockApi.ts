import { Site } from "./PowerUpContext";

export function fetchSite(stationId: string): Promise<Site> {
  // Check if station belongs to Hypercharge North Vancouver
  const isHyperchargeNorthVan = ["2222", "2223", "2224"].includes(stationId);
  
  if (isHyperchargeNorthVan) {
    // Hypercharge North Vancouver site - 2222 has NO existing Power Up Form
    const hasExistingPUF = stationId !== "2222";
    return Promise.resolve({
      id: "SITE-HCNV",
      name: "Hypercharge North Vancouver",
      address: "456 Lonsdale Ave, North Vancouver, BC",
      stations: ["2222", "2223", "2224"],
      panels: hasExistingPUF
        ? [
            {
              id: "EV Panel 1",
              location: "Electrical Room P1",
              circuits: [
                {
                  id: "Circuit 1/3",
                  breaker: 40,
                  continuous: 32,
                  stations: [
                    { id: "2223", online: true },
                    { id: "2224", online: false },
                  ],
                },
              ],
            },
          ]
        : [],
    });
  } else {
    // Default demo site for other station IDs - all have existing PUF
    return Promise.resolve({
      id: "SITE-123",
      name: "Demo Mall",
      address: "123 Main St, Vancouver",
      stations: ["1234", "5678", "9012"],
      panels: [
        {
          id: "Main Panel",
          location: "Basement Electrical",
          circuits: [
            {
              id: "Circuit 1/2",
              breaker: 40,
              continuous: 32,
              stations: [
                { id: "1234", online: true },
                { id: "5678", online: false },
              ],
            },
          ],
        },
      ],
    });
  }
}

// submitPowerUp moved to dedicated file: submitPowerUp.ts 