export function resolveHref(
  documentType?: string,
  slug?: string,
): string | undefined {
  switch (documentType) {
    case 'landing':
      return slug ? `/${slug}` : undefined;
    case 'page':
      return slug ? `/${slug}` : undefined;
    case 'post':
      return slug ? `/blog/${slug}` : undefined;
    default:
      console.warn('Invalid document type:', documentType);
      return undefined;
  }
}
