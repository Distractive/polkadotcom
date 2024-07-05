"use client"

import { HubspotProvider } from "next-hubspot"

import {
  Button,
  ButtonStyles,
  cn,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Heading,
} from "@shared/ui"

import { Form } from "./form"

interface Props {
  // dialog: TypeFromSelection<typeof dialogSelection>
}

export function FormModalBlock({}: Props) {
  return (
    <HubspotProvider>
      <Dialog>
        <div className="grid-system max-width">
          <div className="col-span-full flex flex-col gap-card rounded-2xl border border-grey-300 bg-white p-gutter lg:col-span-8 lg:col-start-3">
            <div className="flex flex-col gap-copy ">
              <Heading variant="h2">
                The lates Polkadot news straight from the source.
              </Heading>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
                consequuntur eveniet labore aliquam expedita sapiente porro,
                cupiditate quia veritatis eaque ipsa maiores itaque doloremque
                iusto inventore perspiciatis voluptate ab reprehenderit.
              </p>
            </div>
            <DialogTrigger className="mr-auto">
              <span
                className={cn(
                  ButtonStyles.base,
                  ButtonStyles.variants.primary,
                  ButtonStyles.sizes.lg
                )}
              >
                Subscribe
              </span>
            </DialogTrigger>
          </div>
          <DialogContent className="rounded-2xl border border-grey-300 bg-white p-gutter">
            <Form />
          </DialogContent>
        </div>
      </Dialog>
    </HubspotProvider>
  )
}
