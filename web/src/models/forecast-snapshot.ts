export interface ForecastSnapshot {
  _id: string;          // Composite ID: store_id:product_id:period
  store_id: string;
  product_id: string;   // Reference to Product._id
  period: string;       // Format: YYYYWWW (ISO week)
  model: string;        // Forecasting model version
  mean_dly_demand: number;
  sigma: number;        // Standard deviation
  coverage_days: number;
  explain: string[];    // Factors affecting forecast
  created_at: number;   // Unix timestamp
}

// Sample forecast snapshot data
export const sampleForecastSnapshot: ForecastSnapshot = {
  _id: "store_123:PARA500T10:2025W40",
  store_id: "store_123",
  product_id: "store_123:paracetamol_500_tab_10s",
  period: "2025W40",
  model: "ets_v1",
  mean_dly_demand: 65.2,
  sigma: 7.8,
  coverage_days: 14,
  explain: ["trend:+", "season:flu"],
  created_at: 1733276400
};

