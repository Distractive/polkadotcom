const FOCUSABLE =
  'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';

export function getFocusableElements(element: HTMLElement) {
  return [...element.querySelectorAll(FOCUSABLE)].filter(
    (el) =>
      !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
  ) as HTMLElement[];
}
