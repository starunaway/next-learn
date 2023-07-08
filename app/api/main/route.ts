import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest, context: any) {
  return NextResponse.json({
    test: 1,
  });
}
