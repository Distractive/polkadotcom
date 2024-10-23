"use client"

import {
  ButtonStyles,
  cn,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  HeadingStyles,
} from "@shared/ui"
import { HubSpotForm } from "@/components/hubspot-form"

interface ModalProps {
  cta: string
  modalHeading: string
  formType: string
  _key: string
}

interface Props {
  modal: ModalProps
  buttonClassName?: string
}

export function ModalButton({ modal, buttonClassName }: Props) {
  return (
    <Dialog>
      <DialogTrigger className={cn("group", buttonClassName)}>
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
    </Dialog>
  )
}
