import Breadcrumb from "@/components/Breadcrumb";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { SITE_METADATA } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Profile Settings | ${SITE_METADATA.title}`,
  description: "Profile Settings",
};

export default function ProfilePage() {
  return (
    <MaxWidthWrapper className="my-5">
      <Breadcrumb />

      <h2 className="lead-10 my-5 mb-5 text-3xl font-extrabold text-black">
        Profile Settings
      </h2>
    </MaxWidthWrapper>
  );
}
