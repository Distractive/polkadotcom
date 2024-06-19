import { PRESS_RELEASE_POSTTYPE } from "@/constants/global"
import Layout from "@/features/posts/layout"

export const dynamic = "force-static"

export default async function Page({
  params: { page, slug },
}: {
  params: { page: string; slug: string }
}) {
  return (
    <Layout
      page={Number(page)}
      tagSlug={slug}
      type={PRESS_RELEASE_POSTTYPE}
      withHeader={false}
    />
  )
}
