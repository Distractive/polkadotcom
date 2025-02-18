'use client';

import type { formSelection } from '@/sanity/selections/blocks/form';
import type { TypeFromSelection } from 'groqd';

import { HubSpotForm } from '@/components/hubspot-form';
import { Heading } from '@shared/ui';

interface Props {
  form: TypeFromSelection<typeof formSelection>;
}

export function EmbedFormBlock({ form }: Props) {
  if (!form) {
    return null;
  }

  return (
    <div className="max-width flex flex-col gap-gutter px-gutter md:flex-row">
      <div className="flex flex-col gap-copy md:basis-[45%]">
        <Heading variant="h2">{form.heading}</Heading>
        <p>{form.body}</p>
      </div>
      <div className="rounded-2xl border border-grey-300 bg-white p-gutter md:basis-[55%]">
        {form.formType && form._key && (
          <HubSpotForm type={form.formType} id={form._key} />
        )}
      </div>
    </div>
  );
}
