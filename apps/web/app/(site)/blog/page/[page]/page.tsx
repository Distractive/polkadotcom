import Layout from "@/features/posts/layout"

export const dynamic = "force-static"

export default async function Page({
  params: { page },
}: {
  params: { page: string }
}) {
  return <Layout page={Number(page)} tagSlug="" type="blog" />
}
