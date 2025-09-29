export type RecommendationObjective = 'expected_gp_max' | 'stockout_min';
export interface Recommendation {
    _id: string;
    store_id: string;
    budget: number;
    objective: RecommendationObjective;
    items: Array<{
        product_id: string;
        qty: number;
        supplier_id: string;
        reason: string[];
        exp_gp: number;
    }>;
    spend: number;
    created_at: number;
}
export declare const sampleRecommendation: Recommendation;
//# sourceMappingURL=recommendation.d.ts.map