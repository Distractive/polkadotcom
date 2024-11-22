import { cookies } from "next/headers"
import { getBanner } from "@/sanity/queries/banner"

import Banner from "./banner"

export async function BannerWrapper() {
  const cookieStore = cookies()
  const bannerClosedCookie = cookieStore.get("banner-closed")
  const initialVisibility = !bannerClosedCookie

  // const banner = await getBanner()

  // return <Banner banner={banner} />
  return null
}
