import type { SVGProps } from "react";

export function FamiconsChevronCollapseOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      {/* Icon from Famicons by Family - https://github.com/familyjs/famicons/blob/main/LICENSE */}
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="m136 104l120 104l120-104M136 408l120-104l120 104"
      />
    </svg>
  );
}
