"use client"

import { useEffect } from "react"

interface Props {
  region: string
  portalId: string
  formId: string
}

export function Form({ region, portalId, formId }: Props) {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "http://js.hsforms.net/forms/embed/v2.js"
    script.id = "hubspot-embed"
    document.body.append(script)

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId,
          formId,
          region,
          target: "#hubspot-form",
        })
      }
    })

    return () => {
      script.remove()
      const form = document.querySelector(`#test`)
      if (form) form.innerHTML = ""
    }
  }, [portalId, formId, region])

  return (
    <div className="w-full">
      <div id="hubspot-form" className="hubspot w-full"></div>
    </div>
  )
}
