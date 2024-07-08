import { BLOG_POSTTYPE } from "@/constants/global"
import Layout from "@/features/posts/layout"

export const dynamic = "force-static"
export const dynamicParams = true

export default async function Blog() {
  return <Layout page={1} type={BLOG_POSTTYPE} tagSlug="" />
}
