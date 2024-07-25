import { BLOG_POSTTYPE } from "@/constants/global"
import Layout from "@/features/posts/layout"

export const dynamicParams = true

export default async function Page({
  params: { page, slug },
}: {
  params: { page: string; slug: string }
}) {
  return (
    <Layout
      page={Number(page)}
      tagSlug={slug}
      type={BLOG_POSTTYPE}
      withHeader={false}
    />
  )
}
