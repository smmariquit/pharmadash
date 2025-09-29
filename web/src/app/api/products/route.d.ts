import { NextResponse } from "next/server";
export declare function GET(request: Request): Promise<NextResponse<{
    products: any;
    lastId: any;
}> | NextResponse<{
    error: string;
}>>;
export declare function POST(request: Request): Promise<NextResponse<{
    error: string;
    product: Product;
}> | NextResponse<{
    message: string;
    products: {
        id: any;
        data: any;
    }[];
}> | NextResponse<{
    error: string;
    details: string;
}>>;
//# sourceMappingURL=route.d.ts.map