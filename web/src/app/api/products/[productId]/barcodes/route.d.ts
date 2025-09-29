import { NextRequest, NextResponse } from "next/server";
export declare function POST(request: NextRequest): Promise<NextResponse<{
    error: string;
}> | NextResponse<{
    message: string;
    product_id: string | undefined;
    barcode: any;
    quantity: any;
    format: any;
}>>;
//# sourceMappingURL=route.d.ts.map