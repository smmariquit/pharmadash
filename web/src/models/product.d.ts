import { Meta, MedicineForm } from './common';
export interface Product {
    _id: string;
    store_id: string;
    sku: string;
    barcode: string;
    brand: string;
    generic: string;
    form: MedicineForm;
    strength: string;
    pack_size: number;
    rx_flag: boolean;
    pricing: {
        srp: number;
        cost: number;
        markup_pct: number;
        tax_code: string;
    };
    replenishment: {
        rop: number;
        roq: number;
        min: number;
        max: number;
    };
    supplier_refs: Array<{
        supplier_id: string;
        lead_days: number;
        moq: number;
    }>;
    substitutes: string[];
    meta: Meta;
}
export declare const sampleProduct: Product;
//# sourceMappingURL=product.d.ts.map