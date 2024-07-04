import { type TypeFromSelection } from "groqd"

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
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Doloremque facilis fugit a! Quos, nisi dolores adipisci sequi
                mollitia hic error provident tempora omnis. Quas accusamus
                aspernatur sunt dicta, iusto excepturi!
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
