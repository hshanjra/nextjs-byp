import { cn } from "@/lib/utils";

const GarageIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="337.000000pt"
      height="310.000000pt"
      viewBox="0 0 337.000000 310.000000"
      preserveAspectRatio="xMidYMid meet"
      className={cn(
        "h-12 w-12 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 p-1",
        className
      )}
    >
      <g
        transform="translate(0.000000,310.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M1655 2533 c-11 -3 -105 -41 -210 -85 -216 -91 -513 -216 -690 -290
-185 -77 -200 -86 -244 -133 -72 -78 -71 -67 -71 -787 l0 -639 25 -24 c28 -29
42 -31 73 -9 l22 15 0 652 0 652 23 40 c25 45 1 33 547 262 151 63 339 142
417 175 l143 60 192 -81 c396 -164 793 -332 844 -355 96 -44 89 12 92 -743 l3
-663 23 -15 c32 -21 75 -10 87 22 13 36 12 1258 -2 1325 -6 29 -22 70 -36 90
-43 63 -34 59 -558 278 -640 269 -632 266 -680 253z"
        />
        <path
          d="M884 1784 c-66 -32 -64 -12 -64 -638 l0 -566 24 -15 c25 -17 70 -12
84 9 4 6 9 256 12 556 l5 545 748 3 747 2 0 -540 0 -541 25 -24 c28 -29 42
-31 73 -9 l22 15 0 565 c0 624 2 607 -64 638 -31 14 -112 16 -808 16 -668 0
-777 -3 -804 -16z"
        />
        <path
          d="M1445 1541 c-83 -21 -111 -59 -168 -231 -37 -113 -51 -142 -84 -176
-57 -59 -63 -91 -63 -332 0 -206 1 -212 22 -232 16 -15 30 -19 48 -15 36 9 43
20 50 73 l5 47 435 0 435 0 5 -47 c7 -55 32 -81 70 -72 47 10 50 23 50 248 0
120 -5 228 -11 250 -6 21 -30 59 -53 85 -36 39 -48 64 -79 164 -40 129 -50
151 -81 185 -48 54 -63 57 -316 59 -129 1 -248 -2 -265 -6z m484 -128 c23 -20
85 -179 77 -200 -4 -10 -66 -13 -308 -13 -167 0 -309 4 -316 8 -21 14 46 193
78 209 18 9 87 13 236 13 187 0 214 -2 233 -17z m135 -337 c57 -24 66 -47 66
-168 l0 -108 -440 0 -440 0 0 108 c0 120 9 144 64 168 46 20 702 20 750 0z"
        />
        <path
          d="M1366 964 c-24 -23 -19 -60 9 -82 30 -24 60 -19 81 14 16 24 11 63
-10 76 -19 13 -64 9 -80 -8z"
        />
        <path
          d="M1923 954 c-15 -24 -15 -29 -2 -53 10 -19 24 -27 49 -29 38 -4 60 16
60 54 0 55 -76 75 -107 28z"
        />
      </g>
    </svg>
  );
};

export default GarageIcon;
