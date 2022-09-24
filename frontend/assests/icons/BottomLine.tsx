import React from "react";

function BottomLine() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="702"
      height="218"
      fill="none"
      viewBox="0 0 702 218"
    >
      <path
        stroke="url(#paint0_linear_196_434)"
        strokeLinecap="round"
        d="M1 109h700"
      ></path>
      <g filter="url(#filter0_d_196_434)">
        <path
          fill="#fff"
          d="M352.15 100c-3.684 6.8-16.118 8.833-21.875 9 16.119 1.5 19.573 6 21.875 9 2.303-6 12.281-8.333 18.421-9-12.664-1.5-16.502-6-18.421-9z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_196_434"
          width="240.296"
          height="218"
          x="230.275"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="50"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_196_434"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_196_434"
            result="shape"
          ></feBlend>
        </filter>
        <linearGradient
          id="paint0_linear_196_434"
          x1="1"
          x2="662.623"
          y1="109"
          y2="109"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity="0"></stop>
          <stop offset="0.469" stopColor="#fff"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default BottomLine;
