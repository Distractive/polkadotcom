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

  console.log({ loaded, error, formCreated })

  return <div id="hubspot-form-wrapper"></div>
}
