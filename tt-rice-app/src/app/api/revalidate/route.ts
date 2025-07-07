import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// This is our secret API route to trigger on-demand revalidation
export async function POST(request: NextRequest) {
  // 1. Get the secret token from the request headers
  const secret = request.headers.get('x-revalidate-secret');

  // 2. Check if the secret token matches our environment variable
  if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  // 3. Get the path to revalidate from the request body
  const body = await request.json();
  const path = body.path;

  if (!path) {
    return NextResponse.json({ message: 'Path to revalidate is required' }, { status: 400 });
  }

  try {
    // 4. Tell Next.js to revalidate the specified path
    revalidatePath(path);
    console.log(`Revalidated path: ${path}`);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error('Error revalidating path:', err);
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}