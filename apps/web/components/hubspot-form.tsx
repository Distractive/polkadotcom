'use client';

import { useEffect, useRef } from 'react';

interface Props {
  type: string;
  id: string;
}

export function HubSpotForm({ type, id }: Props) {
  const formInitialized = useRef(false);

  useEffect(() => {
    const createForm = () => {
      if (
        document.querySelector(`#hbspt-${id}`) &&
        window.hbspt &&
        !formInitialized.current
      ) {
        formInitialized.current = true;
        window.hbspt.forms.create({
          region: 'na1',
          portalId: '7592558',
          target: `#hbspt-${id}`,
          formId: type,
        });
      }
    };

    let retryCount = 0;
    const maxRetries = 5;
    const retryDelay = 500;

    const attemptFormCreation = () => {
      if (formInitialized.current) return;

      createForm();

      if (!formInitialized.current && retryCount < maxRetries) {
        retryCount++;
        setTimeout(attemptFormCreation, retryDelay);
      }
    };

    if (type && id) {
      attemptFormCreation();
    }
  }, [type, id]);

  return (
    <div className="w-full">
      {/* biome-ignore lint/style/useSelfClosingElements: <Not possible> */}
      <div id={`hbspt-${id}`} className="hubspot w-full"></div>
    </div>
  );
}
