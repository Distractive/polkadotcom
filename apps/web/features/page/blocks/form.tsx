"use client"

import { useHubspotForm } from "next-hubspot"

interface Props {
  // dialog: TypeFromSelection<typeof dialogSelection>
}

export function Form({}: Props) {
  const { loaded, error, formCreated } = useHubspotForm({
    region: "na1",
    portalId: "7592558",
    formId: "a5ecd657-6aae-4da0-bf08-f3b994919f0b",
    target: "#hubspot-form-wrapper",
  })

  return (
    <div id="hubspot-form-wrapper" className="min-w-56">
      {!loaded && <div>Loading</div>}
      {error && <div>Error loading form</div>}
    </div>
  )
}
