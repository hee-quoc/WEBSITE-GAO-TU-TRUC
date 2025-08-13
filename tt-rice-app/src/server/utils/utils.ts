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