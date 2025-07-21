import { apiFetch } from './useApi';
export function submitPowerUp(payload: unknown) {
  return apiFetch('/power-up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
} 