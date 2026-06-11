// web/src/app/api/products/search/route.d.ts

import { NextResponse } from "next/server";
export declare function GET(request: Request): Promise<NextResponse<{
    error: string;
}> | NextResponse<{
    products: any[];
}>>;
//# sourceMappingURL=route.d.ts.map