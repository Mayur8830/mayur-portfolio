type P = { className?: string };

export const IconArrow = ({ className = "btn__icon" }: P) => (
  <svg className={className} width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconArrowUpRight = ({ className = "link__icon" }: P) => (
  <svg className={className} width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5 11L11 5M11 5H5.6M11 5v5.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconDownload = ({ className = "btn__icon" }: P) => (
  <svg className={className} width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2.5v8M4.6 7.4L8 10.8l3.4-3.4M2.8 13.2h10.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconTop = ({ className = "" }: P) => (
  <svg className={className} width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 13V4M4.4 7.6L8 4l3.6 3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
