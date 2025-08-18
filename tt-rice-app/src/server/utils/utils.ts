import slugify from "slugify";
import { db } from "~/server/db";

export async function generateUniqueSlug(title: string): Promise<string> {
  const slug = slugify(title, { lower: true, strict: true });
  let count = 0;
  
  while (true) {
    const potentialSlug = count === 0 ? slug : `${slug}-${count}`;
    const existing = await db.product.findUnique({
      where: { slug: potentialSlug },
    });
    
    if (!existing) {
      return potentialSlug; // It's unique, return it
    }
    
    count++; // It's not unique, increment counter and try again
  }
}

export async function triggerRevalidation(path:string) {
  const revalidateUrl = new URL('/api/revalidate', process.env.NEXT_PUBLIC_APP_URL);
  
  try {
    await fetch(revalidateUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': process.env.REVALIDATE_SECRET_TOKEN!,
      },
      body: JSON.stringify({
        path: `/${path}`, // The path we want to rebuild
      }),
    });
    console.log('Successfully triggered revalidation for /products');
  } catch (err) {
    console.error('Failed to trigger revalidation:', err);
  }
}