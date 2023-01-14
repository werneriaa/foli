import { ReactElement } from "react";

export type Logo = React.SVGProps<SVGSVGElement> & { color?: string };

export const FoliLogo: React.FC = ({ color, ...props }: Logo): ReactElement => {
  return (
    <svg
      width={props.width || "47.788"}
      height={props.height || "26.772"}
      {...props}
    >
      <g data-name="Group 110" fill={"#1a1818" || color}>
        <path
          data-name="Path 124"
          d="M47.397 26.674a.426.426 0 00.391-.425V2.517a.346.346 0 00-.391-.326h-5.582a.322.322 0 00-.295.326v23.664a.471.471 0 00.425.49zm-12.78-6.757a.218.218 0 01-.2-.228V2.551a.335.335 0 00-.326-.36h-5.513a.487.487 0 00-.424.457v23.6a.4.4 0 00.359.425h11.685a.363.363 0 00.36-.36v-6.07a.336.336 0 00-.36-.327zM0 26.249a.427.427 0 00.36.425h5.68a.4.4 0 00.424-.458v-7.935c0-.2.164-.424.326-.424h5.276a.37.37 0 00.392-.359V11.59a.385.385 0 00-.36-.328H6.79c-.228 0-.326-.13-.326-.293V9.01a.342.342 0 01.359-.358h5.289a.433.433 0 00.424-.424v-5.68a.371.371 0 00-.392-.36H.392a.435.435 0 00-.393.457z"
        ></path>
        <path
          data-name="Path 125"
          d="M17.408 5.068a2.534 2.534 0 10-2.534-2.535 2.535 2.535 0 002.534 2.535"
        ></path>
        <path
          data-name="Path 126"
          d="M23.238 5.068a2.534 2.534 0 10-2.535-2.535 2.534 2.534 0 002.535 2.535"
        ></path>
        <path
          data-name="Path 127"
          d="M20.303 5.622c-3.623 0-6.789 2.449-6.789 7.508v6.166c0 5.06 3.2 7.476 6.789 7.476s6.79-2.448 6.79-7.476V13.13c0-5.06-3.167-7.508-6.79-7.508m1.45 13.539a1.451 1.451 0 01-2.9 0V13.22a1.451 1.451 0 012.9 0z"
        ></path>
      </g>
    </svg>
  );
};
