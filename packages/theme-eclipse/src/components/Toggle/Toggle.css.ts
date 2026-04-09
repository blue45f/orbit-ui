// Vanilla-extract has been removed. Styles are now applied via inline className strings.
export const root =
  'inline-flex relative items-center transition-all duration-300 [cubic-bezier(0.4,0,0.2,1)] border border-transparent rounded-full cursor-pointer w-11 h-6 [background-color:var(--sem-eclipse-color-fillSecondary)] data-[state=checked]:[background-color:var(--sem-eclipse-color-systemMainPrimary)] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_color-mix(in_srgb,var(--sem-eclipse-color-systemMainPrimary)_25%,transparent)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'

export const thumb =
  'block translate-x-[3px] transition-transform duration-300 [cubic-bezier(0.4,0,0.2,1)] rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)] bg-white w-[18px] h-[18px] [*[data-state=checked]_&]:translate-x-[21px]'
