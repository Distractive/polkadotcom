'use client';

import { cn } from '@shared/ui';

import { ModalButton } from './modal-button';

interface NewsletterSignupProps {
  value: {
    label: string;
    modalHeading: string;
    formType: string;
    variant?: 'primary' | 'secondary';
    _key: string;
    size?: 'sm' | 'md' | 'lg';
  };
  className?: string;
}

interface ModalProps {
  cta: string;
  modalHeading: string;
  formType: string;
  _key: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function NewsletterButton({ value, className }: NewsletterSignupProps) {
  const modalProps: ModalProps = {
    cta: value.label,
    modalHeading: value.modalHeading,
    formType: value.formType,
    _key: value._key,
    variant: value.variant as 'primary' | 'secondary',
    size: value.size || 'md',
  };

  return (
    <ModalButton
      modal={modalProps}
      buttonClassName={cn('mr-auto', className)}
    />
  );
}
