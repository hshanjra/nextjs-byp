import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { SITE_METADATA } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | " + SITE_METADATA.name,
};

export default function CookiePolicyPage() {
  return (
    <MaxWidthWrapper className="my-10">
      <div className="items-center">
        <div className="justify-center col-span-4 lg:col-span-8 lg:col-start-3 mb-8">
          <h1 className="uppercase pb-5 text-xl font-bold text-black ">
            {SITE_METADATA.name} Cookie Policy
          </h1>
          <p className="pb-6 text-base font-light">
            Buyurparts.com uses cookies to enhance your browsing experience.
            Cookies are small text files stored on your device that help us
            understand how you use our site and improve its functionality. By
            continuing to use our website, you consent to our use of cookies in
            accordance with this policy. We use cookies for various purposes,
            including remembering your preferences, keeping you logged in, and
            analyzing site traffic. You can manage your cookie settings through
            your browser at any time, but please note that disabling cookies may
            affect the functionality of our website.
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
