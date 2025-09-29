export type RecommendationObjective = 'expected_gp_max' | 'stockout_min';

export interface Recommendation {
  _id: string;          // Composite ID: store_id:REC_period_context
  store_id: string;
  budget: number;
  objective: RecommendationObjective;
  items: Array<{
    product_id: string; // Reference to Product._id
    qty: number;
    supplier_id: string;
    reason: string[];   // Factors influencing recommendation
    exp_gp: number;     // Expected gross profit
  }>;
  spend: number;        // Total recommended spend
  created_at: number;   // Unix timestamp
}

// Sample recommendation data
export const sampleRecommendation: Recommendation = {
  _id: "store_123:REC_2025W40_BUDGET50000",
  store_id: "store_123",
  budget: 50000,
  objective: "expected_gp_max",
  items: [
    {
      product_id: "store_123:paracetamol_500_tab_10s",
      qty: 600,
      supplier_id: "sup_unilab",
      reason: ["high_margin", "forecast_up", "low_stock"],
      exp_gp: 480
    },
    {
      product_id: "store_123:tempra_drops",
      qty: 80,
      supplier_id: "sup_taisho",
      reason: ["substitute_available", "flu_season"],
      exp_gp: 220
    }
  ],
  spend: 49870,
  created_at: 1733280000
};

