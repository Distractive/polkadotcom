"use client"

import { useEffect, useRef } from "react"

interface Props {
  type: string
  id: string
}

export function HubSpotForm({ type, id }: Props) {
  console.log("HubSpotForm form mounting", type, id)
  const formInitialized = useRef(false)

  useEffect(() => {
    const createForm = () => {
      if (
        document.querySelector(`#hbspt-${id}`) &&
        window.hbspt &&
        !formInitialized.current
      ) {
        formInitialized.current = true
        window.hbspt.forms.create({
          region: "na1",
          portalId: "7592558",
          target: `#hbspt-${id}`,
          formId: type,
        })
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
