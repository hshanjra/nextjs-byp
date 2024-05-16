"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import LightIcon from "../icons/Light";
import Link from "next/link";
import { Separator } from "../ui/separator";
import {
  BatteryCharging,
  CarFront,
  ChevronDown,
  ChevronRight,
  Home,
  KeySquare,
  LoaderPinwheel,
  Sparkles,
  Sun,
  Wrench,
} from "lucide-react";
import GarageIcon from "../icons/Garage";

interface Category {
  icon: JSX.Element;
  name: string;
  link: string;
  subCategories?: {
    name: string;
    link: string;
  }[];
}

interface Props {
  className?: string;
  direction?: string;
}

const categoryItems: Category[] = [
  {
    icon: <Sun />,
    name: "Headlights",
    link: "/headlights",
    subCategories: [
      {
        name: "Fog Lights",
        link: "/fog-lights",
      },
      {
        name: "Reflectors",
        link: "/reflactors",
      },
    ],
  },
  {
    icon: <CarFront />,
    name: "Interior Accessories",
    link: "/interior-accessories",
  },
  {
    icon: <LoaderPinwheel />,
    name: "Tires & Wheels",
    link: "/tires-and-wheels",
    subCategories: [
      {
        name: "Fog Lights",
        link: "/fog-lights",
      },
      {
        name: "Reflectors",
        link: "/reflactors",
      },
    ],
  },
  {
    icon: <Wrench />,
    name: "Tools & Equipments",
    link: "/tools-equipmets",
  },
  {
    icon: <KeySquare />,
    name: "Auto Safety & Security",
    link: "/auto-safety-security",
  },
  {
    icon: <Home />,
    name: "Garage Tools",
    link: "/garage-tools",
  },
  {
    icon: <BatteryCharging />,
    name: "Original Battery",
    link: "/original-battery",
  },
  {
    icon: <Sparkles />,
    name: "Buyurparts Bestsellers",
    link: "/bestsellers",
  },
];

const CategoryItems: React.FC<Props> = ({
  className,
  direction = "bottom",
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (link: string) => {
    if (expandedCategories.includes(link)) {
      setExpandedCategories(expandedCategories.filter((item) => item !== link));
    } else {
      setExpandedCategories([...expandedCategories, link]);
    }
  };

  const handleArrowClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    link: string
  ) => {
    event.stopPropagation();
    toggleCategory(link);
  };

  return (
    <>
      {direction === "bottom" ? (
        <div className={cn("", className)}>
          <ul>
            {categoryItems &&
              categoryItems.map((item: Category) => (
                <div key={item.link}>
                  <div
                    className="group flex items-center justify-between"
                    onClick={() =>
                      item.subCategories && toggleCategory(item.link)
                    }
                  >
                    <Link href={item.link} passHref>
                      <li className="flex py-2 justify-between cursor-pointer">
                        <div className="flex space-x-2">
                          {item.icon}
                          <span className="font-semibold text-base">
                            {item.name}
                          </span>
                        </div>
                      </li>
                    </Link>

                    {item.subCategories && (
                      <ChevronDown
                        className="h-4 w-4 opacity-50 cursor-pointer"
                        onClick={(e) => handleArrowClick(e, item.link)}
                      />
                    )}
                  </div>
                  {item.subCategories &&
                    expandedCategories.includes(item.link) &&
                    item.subCategories.map((subcat) => (
                      <div key={subcat.link}>
                        <Link href={subcat.link} passHref>
                          <li className="flex py-2 justify-between cursor-pointer">
                            <span className="text-sm ml-8">{subcat.name}</span>
                          </li>
                        </Link>
                      </div>
                    ))}
                  <Separator />
                </div>
              ))}
            <Link href="/new-arrivals" passHref>
              <li className="flex p-2 justify-between cursor-pointer w-full items-center">
                <div className="font-semibold text-base">New Arrivals</div>
                <div className="px-2 py-1 bg-sky-400 text-white rounded-xl font-bold text-xs">
                  NEW
                </div>
              </li>
            </Link>
          </ul>
        </div>
      ) : (
        <div className={cn("border px-2 py-1", className)}>
          <ul>
            {categoryItems &&
              categoryItems.map((item: Category) => (
                <div key={item.link}>
                  <div className="group flex items-center justify-between">
                    <Link href={item.link} passHref>
                      <li className="flex py-2 justify-between cursor-pointer">
                        <div className="flex space-x-2">
                          {item.icon}
                          <span className="text-sm">{item.name}</span>
                        </div>
                      </li>
                    </Link>

                    {item.subCategories && (
                      <ChevronRight className="h-4 w-4 opacity-50 cursor-pointer" />
                    )}
                  </div>
                  {item.subCategories &&
                    expandedCategories.includes(item.link) &&
                    item.subCategories.map((subcat) => (
                      <div key={subcat.link}>
                        <Link href={subcat.link} passHref>
                          <li className="flex py-2 justify-between cursor-pointer">
                            <span className="text-sm ml-8">{subcat.name}</span>
                          </li>
                        </Link>
                      </div>
                    ))}
                  <Separator />
                </div>
              ))}
            <Link href="/new-arrivals" passHref>
              <li className="flex p-2 justify-between cursor-pointer w-full items-center">
                <div className="text-sm">New Arrivals</div>
                <div className="px-2 py-1 bg-sky-400 text-white rounded-xl font-bold text-xs">
                  NEW
                </div>
              </li>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default CategoryItems;
