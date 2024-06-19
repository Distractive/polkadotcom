import { PRESS_RELEASE_POSTTYPE } from "@/constants/global"
import Layout from "@/features/posts/layout"

export default async function Tag({
  params: { slug },
}: {
  params: { slug: string }
}) {
  return (
    <Layout
      page={1}
      type={PRESS_RELEASE_POSTTYPE}
      tagSlug={slug}
      withHeader={false}
    />
  )
}
