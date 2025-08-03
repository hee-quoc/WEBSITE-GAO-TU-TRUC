import slugify from "slugify";

export function createUniqueSlug(title: string): string {
  const baseSlug = slugify(title, {
    lower: true,      // convert to lower case
    strict: true,     // strip special characters
    remove: /[*+~.()'"!:@]/g,
  });
  
  // We'll handle uniqueness in the server action, but this gives a clean base.
  return baseSlug;
}