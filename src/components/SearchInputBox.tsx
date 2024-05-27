import { Search } from "lucide-react";
import { Input } from "./ui/input";

export default function SearchInputBox() {
  return (
    <section className="relative w-full">
      <Input placeholder="Search for products" className="w-full" />
      <Search
        className="absolute top-[50%] right-0 translate-y-[-50%] cursor-pointer mr-2 bg-white h-auto"
        size={20}
      />
    </section>
  );
}
