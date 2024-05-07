import Layout from "@/features/posts/layout"

export default async function Tag({
  params: { slug },
}: {
  params: { slug: string }
}) {
  return <Layout page={1} type="blog" tagSlug={slug} />
}
