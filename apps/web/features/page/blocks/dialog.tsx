"use client"

import { useEffect, useRef } from "react"

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Heading,
} from "@shared/ui"

interface Props {
  // dialog: TypeFromSelection<typeof dialogSelection>
}

export function DialogBlock({}: Props) {
  const form = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!(form && window.hbspt)) return

    console.log(window.hbspt, form.current)

    window.hbspt.forms.create({
      region: "na1",
      portalId: "7592558",
      formId: "a5ecd657-6aae-4da0-bf08-f3b994919f0b",
      target: form.current,
    })
  }, [])

  return (
    <div className="grid-system px-gutter">
      <Dialog>
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
            <Button>Subscribe</Button>
          </DialogTrigger>
        </div>
        <DialogContent className="rounded-2xl border border-grey-300 bg-white p-gutter">
          <DialogHeader className="flex flex-col gap-copy">
            <DialogTitle>
              <Heading variant="h3">Stay informed</Heading>
            </DialogTitle>
            <DialogDescription>
              <div ref={form}></div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
