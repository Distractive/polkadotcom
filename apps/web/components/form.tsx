"use client"

import { useEffect, useState } from "react"

interface Props {
  region: string
  portalId: string
  formId: string
}

export function Form({ region, portalId, formId }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!(region && portalId && formId)) return

    const script = document.createElement("script")
    script.src = "http://js.hsforms.net/forms/embed/v2.js"
    document.body.append(script)

    const onLoad = () => {
      setLoaded(true)
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId,
          formId,
          region,
          target: "#hubspot-form",
        })
      }
    }

    const onError = () => {
      setLoaded(false)
      setError(true)
    }

    script.addEventListener("load", onLoad)
    script.addEventListener("error", onError)

    return () => {
      script.removeEventListener("load", onLoad)
      script.removeEventListener("error", onError)
      script.remove()
      const form = document.querySelector("#hubspot-form")
      if (form) form.innerHTML = ""
    }
  }, [portalId, formId, region])

  return (
    <div className="w-full">
      {!loaded && <p>Loading</p>}
      {error && <p>Error loading form</p>}
      <div id="hubspot-form" className="hubspot w-full"></div>
    </div>
  )
}
