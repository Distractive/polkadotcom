import Layout from "@/features/posts/layout"

export const dynamic = "force-static"

export default async function Page({
  params: { page, slug },
}: {
  params: { page: number; slug: string }
}) {
  return <Layout page={page} tagSlug={slug} type="blog" />
}
