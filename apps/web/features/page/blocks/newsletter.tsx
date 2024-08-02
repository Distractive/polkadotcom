import { modalSelection } from "@/sanity/selections/blocks/modal"
import { TypeFromSelection } from "groqd"

import { polkadotNewsletter } from "../../forms/newsletters"
import { FormModalBlock } from "./form-modal"

export function Newsletter() {
  return (
    <div className="mb-[12rem] mt-[6rem] md:mb-0 md:mt-[14rem]">
      <FormModalBlock modal={polkadotNewsletter} />
    </div>
  )
}
