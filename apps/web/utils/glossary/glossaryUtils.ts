interface GlossaryEntry {
  _id: string
  term: string
  shortEntry: any[]
  createFullPageEntry: boolean | null
  slug?: any
}

// Group entries by first letter
export const groupEntriesByLetter = (entries: GlossaryEntry[]) => {
  const grouped: Record<string, GlossaryEntry[]> = {}

  entries.forEach((entry) => {
    const firstLetter = entry.term?.charAt(0).toUpperCase()
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = []
    }
    grouped[firstLetter]!.push(entry)
  })

  return grouped
}

// Clean terms for data-terms attribute, replaces zero-width characters and HTML entities. Without this data-term turns into a spammy mess of unicode characters.
export const cleanTerm = (keepSpacesAndCaps: boolean, term: string) => {
  if (!term) return ""

  let cleanedTerm = term
    .replace(/[\u200B\uFEFF\u200C\u200D]/g, "")
    .replace(/&zwnj;/g, "")
    .replace(/&zwj;/g, "")

  cleanedTerm = keepSpacesAndCaps
    ? cleanedTerm
    : cleanedTerm.replace(/\s+/g, "-").toLowerCase()

  return cleanedTerm
}

export const preprocessEntries = (
  entries: GlossaryEntry[],
  keepSpacesAndCaps = false
) => {
  return entries.map((entry) => ({
    ...entry,
    cleanedTerm: cleanTerm(keepSpacesAndCaps, entry.term),
  }))
}
