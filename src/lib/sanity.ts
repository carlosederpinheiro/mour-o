import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'ypbghhi4',
  dataset: 'production',
  useCdn: true, // Use CDN for faster, cached responses
  apiVersion: '2024-03-01', // Use a recent date
});

const builder = createImageUrlBuilder(client);

// Helper function to resolve image URLs from Sanity
export function urlFor(source: any) {
  return builder.image(source);
}
