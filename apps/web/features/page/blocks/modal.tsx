"use client"

import { type modalSelection } from "@/sanity/selections/blocks/modal"
import { type TypeFromSelection } from "groqd"
import { HubspotProvider } from "next-hubspot"

import {
  ButtonStyles,
  cn,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Heading,
  HeadingStyles,
} from "@shared/ui"

import { Form } from "../../../components/form"

interface Props {
  modal: TypeFromSelection<typeof modalSelection>
}

export function ModalBlock({ modal }: Props) {
  return (
    <HubspotProvider>
      <Dialog>
        <div className="grid-system max-width">
          <div className="col-span-full flex flex-col gap-card rounded-2xl border border-grey-300 bg-white p-gutter lg:col-span-8 lg:col-start-3">
            <div className="flex flex-col gap-copy ">
              <Heading variant="h2">{modal.heading}</Heading>
              <p>{modal.body}</p>
            </div>
            <DialogTrigger className="mr-auto">
              <span
                className={cn(
                  ButtonStyles.base,
                  ButtonStyles.variants.primary,
                  ButtonStyles.sizes.lg
                )}
              >
                {modal.cta}
              </span>
            </DialogTrigger>
          </div>
          <DialogContent className="w-[90%] overflow-hidden rounded-2xl border border-grey-300 bg-white lg:w-[70%]">
            <div className="flex h-[60vh] flex-col gap-card overflow-auto p-gutter">
              <DialogTitle
                className={cn(HeadingStyles.base, HeadingStyles.sizes.h2)}
              >
                {modal.modalHeading}
                {modal.formType}
              </DialogTitle>
              <Form />
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </HubspotProvider>
  )
}
