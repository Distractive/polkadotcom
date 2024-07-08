"use client"

import { useHubspotForm } from "next-hubspot"

export function Form() {
  const { loaded, error } = useHubspotForm({
    region: "na1",
    portalId: "7592558",
    formId: "a5ecd657-6aae-4da0-bf08-f3b994919f0b",
    target: "#hubspot-form-wrapper",
  })

  return (
    <div className="w-full">
      <div className="flex flex-col gap-copy">
        {!loaded && <p>Loading</p>}
        {error && <p>Error loading form</p>}
      </div>
      <div id="hubspot-form-wrapper" className="hubspot w-full"></div>
    </div>
  )
}
