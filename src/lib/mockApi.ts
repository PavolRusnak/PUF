import { Site } from "./PowerUpContext";

export function fetchSite(stationId: string): Promise<Site> {
  // demo mock: if stationId === "1234" include existing circuit; else empty site
  const hasAssigned = stationId === "1234";
  return Promise.resolve({
    id: "SITE-123",
    name: "Demo Mall",
    address: "123 Main St, Vancouver",
    stations: ["1234", "5678", "9012"],
    panels: hasAssigned
      ? [
          {
            id: "EV Panel 1",
            location: "Electrical Room on P1",
            circuits: [
              {
                id: "CIR-1",
                breaker: 40,
                continuous: 32,
                stations: [
                  { id: "1234", stall: "S1", online: true },
                  { id: "5678", stall: "S2", online: false },
                ],
              },
            ],
          },
        ]
      : [],
  });
}

// submitPowerUp moved to dedicated file: submitPowerUp.ts 