import { PRESS_RELEASE_POSTTYPE } from "@/constants/global"
import Layout from "@/features/posts/layout"

export const dynamic = "force-static"

export default async function PressRelease() {
  return <Layout page={1} type={PRESS_RELEASE_POSTTYPE} tagSlug="" />
}
