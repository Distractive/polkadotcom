import Layout from "@/features/post/layout"

export default async function Slug({
  params: { slug },
}: {
  params: { slug: string }
}) {
  return <Layout slug={slug} />
}
