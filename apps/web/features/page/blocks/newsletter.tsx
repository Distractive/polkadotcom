import { modalSelection } from "@/sanity/selections/blocks/modal"
import { TypeFromSelection } from "groqd"

import { polkadotNewsletter } from "../../forms/newsletters"
import { FormModalBlock } from "./form-modal"

export function Newsletter() {
  return (
    <div className="pb-24 pt-24 md:pb-0 ">
      <FormModalBlock modal={polkadotNewsletter} />
    </div>
  )
}
