import { NextRequest, NextResponse } from "next/server";
export declare function GET(request: NextRequest, { params }: {
    params: {
        productId: string;
    };
}): Promise<NextResponse<any>>;
export declare function PUT(request: NextRequest, { params }: {
    params: {
        productId: string;
    };
}): Promise<NextResponse<{
    error: string;
}> | NextResponse<{
    message: string;
    id: string;
}>>;
export declare function DELETE(request: NextRequest, { params }: {
    params: {
        productId: string;
    };
}): Promise<NextResponse<{
    error: string;
}> | NextResponse<{
    message: string;
    id: string;
}>>;
//# sourceMappingURL=route.d.ts.map