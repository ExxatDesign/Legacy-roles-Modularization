type EmployeeIconProps = {
  size?: number;
  className?: string;
};

/** Employee badge — circle + person (legacy Fuse reference). */
export function EmployeeIcon({ size = 32, className }: EmployeeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="16" cy="16" r="16" fill="var(--prism-primary-avatar-bg)" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.4 10.2C19.4 11.0487 19.0629 11.8626 18.4627 12.4627C17.8626 13.0629 17.0487 13.4 16.2 13.4C15.3513 13.4 14.5374 13.0629 13.9373 12.4627C13.3371 11.8626 13 11.0487 13 10.2C13 9.35131 13.3371 8.53737 13.9373 7.93726C14.5374 7.33714 15.3513 7 16.2 7C17.0487 7 17.8626 7.33714 18.4627 7.93726C19.0629 8.53737 19.4 9.35131 19.4 10.2ZM16.2 15C12.28 15 9 17 9 19.8V23H23.4V19.8C23.4 17 20.12 15 16.2 15ZM15 15.8H17.4L16.68 17.4L17.4 20.6L16.2 21.8L15 20.6L15.72 17.4L15 15.8ZM19.4 18.2H21.8V19.8H19.4V18.2Z"
        fill="var(--prism-primary)"
      />
    </svg>
  );
}
