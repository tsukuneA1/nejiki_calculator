import { SVGProps } from 'react';

export function IonChevronExpandOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      {/* Icon from IonIcons by Ben Sperry - https://github.com/ionic-team/ionicons/blob/main/LICENSE */}
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="m136 208l120-104l120 104m-240 96l120 104l120-104"
      ></path>
    </svg>
  );
}
