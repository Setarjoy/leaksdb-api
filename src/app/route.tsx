import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: false,
    message: "Use /api/leaksdb?query=your_query"
  });
}
