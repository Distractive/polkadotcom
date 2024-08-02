"use client"

import { type modalSelection } from "@/sanity/selections/blocks/modal"
import { type TypeFromSelection } from "groqd"

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
import { HubSpotForm } from "@/components/hubspot-form"

interface Props {
  modal: TypeFromSelection<typeof modalSelection>
}

export function FormModalBlock({ modal }: Props) {
  return (
    <Dialog>
      <div className="grid-system max-width">
        <div className="col-span-full px-gutter lg:col-span-8 lg:col-start-3">
          <div className="background-blur flex flex-col gap-card rounded-2xl border border-grey-300 bg-white/80 p-gutter">
            <div className="flex flex-col gap-copy ">
              <Heading variant="h2">{modal.heading}</Heading>
              <p>{modal.body}</p>
            </div>
            <DialogTrigger className="group mr-auto">
              <span
                className={cn(
                  ButtonStyles.base,
                  ButtonStyles.variants.primary,
                  ButtonStyles.sizes.lg,
                  "group-focus-within:after:translate-x-0 md:group-hover:after:translate-x-0"
                )}
              >
                {modal.cta}
              </span>
            </DialogTrigger>
          </div>
        </div>
        <DialogContent className="mx-auto w-[90%] overflow-hidden rounded-2xl border border-grey-300 bg-white lg:w-[70%]">
          <div className="mt-card flex h-[70vh] flex-col gap-card overflow-auto p-gutter lg:mt-0">
            <DialogTitle
              className={cn(HeadingStyles.base, HeadingStyles.sizes.h2)}
            >
              {modal.modalHeading}
            </DialogTitle>
            <HubSpotForm type={modal.formType} id={modal._key} />
          </div>
        </DialogContent>
      </div>
    </Dialog>
  )
}
