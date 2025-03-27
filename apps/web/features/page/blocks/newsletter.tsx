import { FormModalBlock } from './form-modal';

export const polkadotNewsletter = {
  _type: 'modal',
  _key: '0e433bc64886',
  heading: 'Polkadot’s latest news, straight from the source',
  body: 'Get your monthly fix of Polkadot updates, events, and scoop on the many incredible projects building on Polkadot.',
  cta: 'Subscribe',
  modalHeading: 'Polkadot’s latest news, straight from the source.',
  formType: 'a5ecd657-6aae-4da0-bf08-f3b994919f0b',
};

export function Newsletter() {
  return (
    <div className="py-16  " data-testid="newsletter">
      <FormModalBlock modal={polkadotNewsletter} />
    </div>
  );
}
