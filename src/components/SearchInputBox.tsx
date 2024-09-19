"use client";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";

export default function SearchInputBox() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.q as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());
    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/products", newParams));
  };
  return (
    <section className="group relative w-full">
      <form onSubmit={onSubmit} action="/products" method="get">
        <Input
          placeholder="Find Parts and Products..."
          className="h-[3rem] w-full rounded-xl transition-all duration-100 focus:border-transparent focus-visible:ring-[1.5px] focus-visible:ring-offset-1"
          name="q"
          key={searchParams?.get("q")}
          autoComplete="off"
          defaultValue={searchParams?.get("q") || ""}
        />
        <button
          type="submit"
          className="absolute right-0 top-[50%] mr-2 h-auto translate-y-[-50%] cursor-pointer bg-white"
        >
          <Search className="group-focus-within:text-ring" strokeWidth={1.5} />
        </button>
      </form>
    </section>
  );
}
