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

import { Form } from "../../../components/form"

interface Props {
  modal: TypeFromSelection<typeof modalSelection>
}

export function ModalBlock({ modal }: Props) {
  return (
    <Dialog>
      <div className="grid-system max-width">
        <div className="col-span-full px-gutter lg:col-span-8 lg:col-start-3">
<<<<<<< HEAD
          <div className="background-blur flex flex-col gap-card rounded-2xl border border-grey-300 bg-grey-200/80 p-gutter">
            <div className="flex flex-col gap-copy ">
=======
          <div className="background-blur flex flex-col gap-card rounded-2xl border border-grey-300 p-gutter">
            <div className="flex flex-col gap-copy">
>>>>>>> cee92a07c9e507ae3ee2e505a705200725829645
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
        </div>
        <DialogContent className="mx-auto w-[90%] overflow-hidden rounded-2xl border border-grey-300 bg-white lg:w-[70%]">
          <div className="mt-card flex h-[70vh] flex-col gap-card overflow-auto p-gutter lg:mt-0">
            <DialogTitle
              className={cn(HeadingStyles.base, HeadingStyles.sizes.h2)}
            >
              {modal.modalHeading}
            </DialogTitle>
            <Form
              region="na1"
              portalId="7592558"
              formId={
                modal.formType === "newsletter"
                  ? "a5ecd657-6aae-4da0-bf08-f3b994919f0b"
                  : "a5269d0b-bb6c-4e56-aa9c-a7758958d541"
              }
            />
          </div>
        </DialogContent>
      </div>
    </Dialog>
  )
}
