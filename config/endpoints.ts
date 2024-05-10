// config/endpoints.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export const AD_RATES_ENDPOINTS = {
  TYPE_1: `${API_BASE_URL}/ad-rates/type/1`,
  TYPE_2: `${API_BASE_URL}/ad-rates/type/2`,
  TYPE_3: `${API_BASE_URL}/ad-rates/type/3`,
  TYPE_4: `${API_BASE_URL}/ad-rates/type/4`,
  TYPE_5: `${API_BASE_URL}/ad-rates/type/5`,
  TYPE_7: `${API_BASE_URL}/ad-rates/type/7`,
};
