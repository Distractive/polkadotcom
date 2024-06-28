import { BLOG_POSTTYPE } from "@/constants/global"
import Layout from "@/features/posts/layout"

export const dynamic = "force-static"
export const dynamicParams = true

export async function generateStaticParams() {
  return [{ page: "1" }]
}

export default async function Page({
  params: { page },
}: {
  params: { page: string }
}) {
  return <Layout page={Number(page)} tagSlug="" type={BLOG_POSTTYPE} />
}
