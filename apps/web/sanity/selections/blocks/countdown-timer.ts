import { q } from "groqd"
import type { Selection } from "groqd"

export const countdownTimerSelection = {
  _key: q.string(),
  heading: q.string().nullable(),
  targetDate: q.string(),
} satisfies Selection
