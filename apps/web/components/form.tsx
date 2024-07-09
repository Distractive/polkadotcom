"use client"

import { type modalSelection } from "@/sanity/selections/blocks/modal"
import { type TypeFromSelection } from "groqd"
import { useHubspotForm } from "next-hubspot"

interface Props {
  type: TypeFromSelection<typeof modalSelection>["formType"]
}

export function Form({ type }: Props) {
  const { loaded, error } = useHubspotForm({
    region: "na1",
    portalId: "7592558",
    formId:
      type === "newsletter"
        ? "a5ecd657-6aae-4da0-bf08-f3b994919f0b"
        : "a5269d0b-bb6c-4e56-aa9c-a7758958d541",
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
