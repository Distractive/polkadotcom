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
  cta?: string | null
  modalHeading?: string | null
  formType?: string | null
  _key?: string | null
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
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
            modal.variant === "secondary"
              ? // Account for 1px border on secondary buttons
                [ButtonStyles.variants.secondary, "!py-[15px]"]
              : ButtonStyles.variants.primary,
            ButtonStyles.sizes[modal.size || "md"],
            "text-left group-focus-within:after:translate-x-0 md:group-hover:after:translate-x-0"
          )}
        >
          {modal.cta}
        </span>
      </DialogTrigger>
      <DialogContent className="mx-auto max-h-[65vh] w-[90%] overflow-y-auto rounded-2xl border border-grey-300 bg-white lg:w-[70%]">
        <div className="flex flex-col gap-card p-gutter">
          <DialogTitle
            className={cn(HeadingStyles.base, HeadingStyles.sizes.h2)}
          >
            {modal.modalHeading}
          </DialogTitle>
          {modal.formType && modal._key && (
            <HubSpotForm type={modal.formType} id={modal._key} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
