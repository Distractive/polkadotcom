import { modalSelection } from "@/sanity/selections/blocks/modal"
import { TypeFromSelection } from "groqd"

import { polkadotNewsletter } from "../../forms/newsletters"
import { FormModalBlock } from "./form-modal"

export function Newsletter() {
  return (
    <div className="py-16  ">
      <FormModalBlock modal={polkadotNewsletter} />
    </div>
  )
}
