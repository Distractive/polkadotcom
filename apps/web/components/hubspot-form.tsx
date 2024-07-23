"use client"

import { useEffect } from "react"

interface Props {
  type: string
  id: string
}

export function HubSpotForm({ type, id }: Props) {
  useEffect(() => {
    const createForm = () => {
      if (document.querySelector(`#hbspt-${id}`) && window.hbspt) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: "7592558",
          target: `#hbspt-${id}`,
          formId: type,
        })
      } else {
        setTimeout(createForm, 1)
      }
    }

    if (type && id) {
      createForm()
    }
  }, [type, id])

  return (
    <div className="w-full">
      <div id={`hbspt-${id}`} className="hubspot w-full"></div>
    </div>
  )
}
