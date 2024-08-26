"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const ScrollAwareContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isNearBottom, setIsNearBottom] = useState(false); // State to control visibility based on scroll position

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500; // Adjust offset as needed
      setIsNearBottom(scrolledToBottom); // Update state when near bottom
    };

    window.addEventListener("scroll", handleScroll); // Add scroll event listener

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup event listener on component unmount
    };
  }, []);

  return (
    <div
      className={cn("fixed bottom-0 transition-all duration-700", className, {
        "-bottom-24": isNearBottom,
      })}
    >
      {children}
    </div>
  );
};

export default ScrollAwareContainer;
