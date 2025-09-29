export interface ForecastSnapshot {
    _id: string;
    store_id: string;
    product_id: string;
    period: string;
    model: string;
    mean_dly_demand: number;
    sigma: number;
    coverage_days: number;
    explain: string[];
    created_at: number;
}
export declare const sampleForecastSnapshot: ForecastSnapshot;
//# sourceMappingURL=forecast-snapshot.d.ts.map