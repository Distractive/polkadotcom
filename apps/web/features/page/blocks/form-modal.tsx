"use client"

import { type modalSelection } from "@/sanity/selections/blocks/modal"
import { type TypeFromSelection } from "groqd"

import { Heading } from "@shared/ui"

import { ModalButton } from "./modal-button"

interface Props {
  modal: TypeFromSelection<typeof modalSelection>
}

export function FormModalBlock({ modal }: Props) {
  return (
    <div className="grid-system max-width">
      <div className="col-span-full px-gutter lg:col-span-8 lg:col-start-3" >
        <div className="flex flex-col gap-card rounded-2xl border border-grey-200 p-gutter">
          <div className="flex flex-col gap-copy ">
            <Heading variant="h2">{modal.heading}</Heading>
            <p>{modal.body}</p>
          </div>
          <div>
            <ModalButton modal={modal} />
          </div>
        </div>
      </div>
    </div>
  )
}
