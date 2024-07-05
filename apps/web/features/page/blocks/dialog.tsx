"use client"

import { HubspotProvider } from "next-hubspot"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui"

import { Form } from "./form"

interface Props {
  // dialog: TypeFromSelection<typeof dialogSelection>
}

export function DialogBlock({}: Props) {
  return (
    <HubspotProvider>
      <Dialog>
        <div className="col-span-full flex flex-col gap-card rounded-2xl border border-grey-300 bg-white p-gutter lg:col-span-8 lg:col-start-3">
          <div className="flex flex-col gap-copy ">
            <div>The lates Polkadot news straight from the source.</div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
              consequuntur eveniet labore aliquam expedita sapiente porro,
              cupiditate quia veritatis eaque ipsa maiores itaque doloremque
              iusto inventore perspiciatis voluptate ab reprehenderit.
            </p>
          </div>
          <DialogTrigger className="mr-auto">Subscribe</DialogTrigger>
        </div>
        <DialogContent className="rounded-2xl border border-grey-300 bg-white p-gutter">
          <DialogHeader className="flex flex-col gap-copy">
            <DialogTitle>
              <div>Stay informed</div>
              <Form />
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </HubspotProvider>
  )
}
