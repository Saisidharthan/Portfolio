import { NextResponse } from 'next/server';

// In-memory counter (resets on redeploy, but good enough for demo)
// For production, use Vercel KV or a database
let totalVisitors = 1000; // Start from a reasonable number
let todayCount = 0;
let lastResetDate = new Date().toDateString();

export async function POST() {
  const today = new Date().toDateString();
  if (today !== lastResetDate) {
    todayCount = 0;
    lastResetDate = today;
  }

  totalVisitors++;
  todayCount++;

  return NextResponse.json({
    total: totalVisitors,
    today: todayCount,
  });
}

export async function GET() {
  return NextResponse.json({
    total: totalVisitors,
    today: todayCount,
  });
}
