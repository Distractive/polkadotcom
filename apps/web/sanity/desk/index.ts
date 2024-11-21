import type {
  StructureBuilder,
  StructureResolverContext,
} from "sanity/structure"

import { bannerStructure } from "./banner"
import { blogStructure } from "./blog"
import { caseStudiesStructure } from "./case-studies"
import { footerStructure } from "./footer"
import { glossaryStructure } from "./glossary"
import { homeStructure } from "./home"
import { hygieneStructure } from "./hygiene"
import { parentChild } from "./landing"
import { navigationStructure } from "./navigation"
import { notFoundStructure } from "./notfound"
import { postStructure } from "./post"
import { pressReleasesStructure } from "./press-releases"
import { redirectStructure } from "./redirect"

export const deskStructure = (
  S: StructureBuilder,
  context: StructureResolverContext
) =>
  S.list()
    .title("Content")
    .items([
      postStructure(S),
      S.divider(),
      parentChild("landing", S, context.documentStore),
      S.divider(),
      hygieneStructure(S),
      S.divider(),
      homeStructure(S),
      S.divider(),
      blogStructure(S),
      S.divider(),
      pressReleasesStructure(S),
      S.divider(),
      caseStudiesStructure(S),
      S.divider(),
      navigationStructure(S),
      S.divider(),
      footerStructure(S),
      S.divider(),
      glossaryStructure(S),
      S.divider(),
      notFoundStructure(S),
      S.divider(),
      bannerStructure(S),
      S.divider(),
      redirectStructure(S),
    ])
