import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import { SITE_METADATA } from "@/constants";
import { ShoppingBasket } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Terms and Conditions - Rules & Regulations, Privacy Policy, Cookie Policy, User Agreement, Returns & Refunds | " +
    SITE_METADATA.name,
};

export default function TermsAndConditionsPage() {
  return (
    <MaxWidthWrapper className="my-10">
      {/* Header */}
      <div className="mb-5 text-center">
        <h1 className="uppercase mb-3 lg:text-4xl text-black">
          Terms & <b>Conditions</b>
        </h1>
        <p className="text-zinc-700 text-sm lg:text-base">
          Kindly peruse these Terms & Conditions for a few minutes. By using the
          &nbsp;{SITE_METADATA.name} website, you consent to being bound by
          these Terms & Conditions and agreeing to abide by them.
        </p>
      </div>
      <Separator />
      {/* User Agreement */}

      <div className="mt-5">
        <h2
          className="uppercase pb-5 text-xl font-bold text-black"
          id="userAgreement"
        >
          User Agreement
        </h2>

        <div className="justify-center col-span-4 lg:col-span-8 lg:col-start-3">
          <h3 className="text-black mb-3 font-semibold">
            Understanding {SITE_METADATA.name}&apos;s User Agreement
          </h3>
          <p className="pb-6 text-sm text-zinc-700">
            At our company, we believe in transparency and making sure our users
            have a clear understanding of our platform’s rules and guidelines.
            This article aims to provide a comprehensive overview of Buyurparts’
            User Agreement, covering all essential aspects to ensure a seamless
            and compliant user experience. By familiarizing yourself with this
            agreement, you can confidently navigate our platform, buy and sell
            products, and make the most of your Buyurparts journey.
          </p>
          <h3 className="text-black mb-3 font-semibold">
            Introduction to Buyurparts’ User Agreement
          </h3>
          <p className="pb-6 text-sm text-zinc-700">
            Buyurparts’ User Agreement serves as the foundation of our online
            marketplace. It outlines the rules and policies that govern the
            interactions between buyers and sellers, promoting a safe and fair
            trading environment. By agreeing to this document, all users,
            including buyers, sellers, and visitors, commit to follow these
            guidelines and uphold the principles of integrity and trust on our
            platform.
          </p>
          <h3 className="text-black mb-3 font-semibold">
            Creating and Managing Your Account
          </h3>
          <p className="pb-6 text-sm text-zinc-700">
            To participate in Buyurparts’ bustling marketplace, users must
            create an account. The User Agreement elaborates on the account
            creation process, emphasizing the importance of providing accurate
            and up-to-date information. Users are solely responsible for
            maintaining the confidentiality of their account credentials and
            ensuring account security. This ensures a personalized and secure
            experience for all Buyurparts members.
          </p>
          <h3 className="text-black mb-3 font-semibold">
            Buying on Buyurparts
          </h3>
          <p className="pb-6 text-sm text-zinc-700">
            In this section, we outline the key aspects of buying on Buyurparts,
            emphasizing the importance of responsible purchasing. Users can
            explore a vast array of products listed by sellers worldwide. The
            User Agreement clarifies the expectations for buyers, encouraging
            timely payments, and respectful communication with sellers. By
            following these guidelines, buyers can confidently shop on
            Buyurparts, knowing their interests and purchases are protected.
          </p>
          <h3 className="text-black mb-3 font-semibold">
            Selling on Buyurparts
          </h3>
          <p className="pb-6 text-sm text-zinc-700">
            For sellers, Buyurparts offers a platform to showcase products to a
            global audience. The User Agreement delves into the responsibilities
            of sellers, stressing the importance of accurate listings, fair
            pricing, and prompt shipment. By maintaining high standards, sellers
            can establish a strong reputation, driving more sales and fostering
            trust with buyers.
          </p>
          <h3 className="text-black mb-3 font-semibold">
            Safe and Secure Transactions
          </h3>
          <p className="pb-6 text-sm text-zinc-700">
            Buyurparts prioritizes the safety and security of all transactions
            conducted on our platform. The User Agreement addresses various
            safety measures, including secure payment methods, protection
            against fraudulent activities, and guidelines for resolving
            disputes. These measures assure users that Buyurparts is committed
            to providing a secure environment for buying and selling.
          </p>
          <h3 className="text-black mb-3 font-semibold">
            Prohibited and Restricted Items
          </h3>
          <p className="pb-6 text-sm text-zinc-700">
            Maintaining the integrity of our marketplace is crucial. As such,
            the User Agreement explicitly outlines items that are prohibited or
            restricted on Buyurparts. This helps prevent the sale of illegal,
            harmful, or inappropriate products, ensuring a positive experience
            for all users.
          </p>
          <h3 className="text-black mb-3 font-semibold">
            User Conduct and Community Guidelines
          </h3>
          <p className="pb-6 text-sm text-zinc-700">
            At Buyurparts, we encourage open and respectful communication among
            users. The User Agreement sets forth community guidelines that
            promote friendly interactions and discourage abusive behavior. By
            adhering to these guidelines, users contribute to a supportive and
            inclusive Buyurparts community.
          </p>
          <h3 className="text-black mb-3 font-semibold">
            Privacy and Data Protection
          </h3>
          <p className="pb-6 text-sm text-zinc-700">
            Buyurparts is committed to protecting users’ privacy and personal
            information. Our User Agreement elucidates our privacy practices,
            assuring users that their data is handled with utmost care and in
            compliance with applicable laws.
          </p>
          <h3 className="text-black mb-3 font-semibold">Conclusion</h3>
          <p className="pb-6 text-sm text-zinc-700">
            In conclusion, Buyurparts’ User Agreement serves as the backbone of
            our platform, fostering a vibrant and secure marketplace. By
            comprehensively understanding and adhering to these guidelines,
            users can engage in transactions with confidence and peace of mind.
            At Buyurparts, we strive to empower our users with the necessary
            knowledge to make their buying and selling experiences enjoyable and
            successful.
          </p>
          <p className="pb-6 text-sm text-zinc-700">
            With this comprehensive understanding of Buyurparts’ User Agreement,
            you are now equipped to navigate our platform confidently and
            responsibly. Should you have any questions or require further
            assistance, our customer support team is always ready to help. Happy
            trading on Buyurparts!
          </p>
        </div>
      </div>

      {/* Privacy Policy */}
      <div className="mt-5">
        <h2
          className="uppercase pb-5 text-xl font-bold text-black"
          id="privacyPolicy"
        >
          A Comprehensive Guide to User Privacy and Data Protection
        </h2>

        <div className="justify-center col-span-4 lg:col-span-8 lg:col-start-3">
          <h3 className="text-black mb-3 font-semibold">Introduction</h3>
          <p className="pb-6 text-sm text-zinc-700">
            At our company, we prioritize user privacy and data protection above
            all else. We understand the importance of safeguarding personal
            information and ensuring a secure online environment for our users.
            In this comprehensive guide, we will delve into our user privacy
            policy and highlight the measures we have in place to protect our
            users’ data. Our commitment to user privacy sets us apart, and we
            aim to provide a safe and transparent experience for everyone who
            interacts with our platform.
          </p>

          <h3 className="text-black mb-3 font-semibold">
            What Information We Collect
          </h3>
          <p className="pb-6 text-sm text-zinc-700">
            As part of our commitment to offering a seamless user experience, we
            collect certain information from our users. The information we
            gather is solely used to enhance our services and provide
            personalized experiences. When users create an account on our
            platform, we may collect basic personal details such as name, email
            address, and contact information. Additionally, we may gather
            non-personal data, including user activity logs, device information,
            and IP addresses. Rest assured that all data collected is securely
            stored and protected from unauthorized access.
          </p>

          <h3 className="text-black mb-3 font-semibold">
            How We Use Collected Information
          </h3>
          <div>
            <p className="pb-6 text-sm text-zinc-700">
              We believe in complete transparency regarding how we use the
              information we collect. The primary purpose of gathering user data
              is to optimize our platform and provide a more tailored experience
              for each user. By analyzing user behavior and preferences, we can
              enhance our services, customize recommendations, and improve
              overall user satisfaction.
            </p>

            <p className="pb-6 text-sm text-zinc-700">
              The non-personal data we collect helps us identify and address
              potential security threats, troubleshoot technical issues, and
              perform statistical analysis to further enhance our platform’s
              performance.
            </p>
          </div>

          <h3 className="text-black mb-3 font-semibold">
            Our Commitment to Data Security
          </h3>
          <p className="pb-6 text-sm text-zinc-700">
            User trust is of paramount importance to us, and that’s why we
            implement robust security measures to safeguard all collected data.
            Our dedicated team of cybersecurity experts ensures that all data is
            protected from unauthorized access, alteration, or disclosure. We
            employ encryption protocols and adhere to industry best practices to
            mitigate any potential security risks.
          </p>

          <h3 className="text-black mb-3 font-semibold">
            Third-Party Data Sharing
          </h3>
          <p className="pb-6 text-sm text-zinc-700">
            We do not share or sell any user information with third parties for
            marketing purposes. However, to improve our services and maintain
            our platform’s functionality, we may collaborate with trusted
            third-party service providers. These partners are carefully
            selected, and they are bound by strict confidentiality agreements to
            ensure the privacy of user data.
          </p>

          <h3 className="text-black mb-3 font-semibold">Children’s Privacy</h3>
          <p className="pb-6 text-sm text-zinc-700">
            {" "}
            Protecting the privacy of children online is a top priority for us.
            Our platform is not intended for use by individuals under the age of
            18, and we do not knowingly collect any personal information from
            minors. If we become aware that a user is under 18 and has provided
            us with personal information, we will take immediate steps to remove
            that data from our records.
          </p>

          <h3 className="text-black mb-3 font-semibold">
            Compliance with Laws and Regulations
          </h3>
          <p className="pb-6 text-sm text-zinc-700">
            We are fully committed to complying with all applicable data
            protection laws and regulations. Our privacy practices align with
            the General Data Protection Regulation (GDPR) and other relevant
            privacy laws. Additionally, we maintain a dedicated legal team to
            stay informed about any updates or changes in privacy legislation
            and ensure our policies remain up-to-date and compliant.
          </p>

          <h3 className="text-black mb-3 font-semibold">
            Your Privacy Choices
          </h3>
          <p className="pb-6 text-sm text-zinc-700">
            We believe in empowering our users to make informed decisions about
            their data. If you wish to review, update, or delete any personal
            information provided to us, you can do so by accessing your account
            settings. We also provide options to opt-out of certain data
            collection practices, such as cookies, while still allowing access
            to our platform.
          </p>

          <h3 className="text-black mb-3 font-semibold">Conclusion</h3>
          <p className="pb-6 text-sm text-zinc-700">
            At our company, user privacy and data protection are at the core of
            everything we do. This comprehensive guide outlines our commitment
            to safeguarding user information, maintaining transparency, and
            complying with privacy laws. We strive to provide a secure and
            seamless experience for all our users, and our dedication to these
            principles sets us apart from others in the industry. As we continue
            to grow and evolve, we will remain steadfast in our commitment to
            protecting your privacy and providing a trusted online platform for
            all.
          </p>
        </div>
      </div>

      {/* Cookie Policy */}
      <div className="mt-5">
        <h2
          className="uppercase pb-5 text-xl font-bold text-black"
          id="cookiePolicy"
        >
          Cookie Policy
        </h2>

        <div className="justify-center col-span-4 lg:col-span-8 lg:col-start-3">
          <h3 className="text-black mb-3 font-semibold">
            {SITE_METADATA.name} Cookie Policy
          </h3>
          <p className="pb-6 text-sm text-zinc-700">
            Buyurparts.com uses cookies to enhance your browsing experience.
            Cookies are small text files stored on your device that help us
            understand how you use our site and improve its functionality. By
            continuing to use our website, you consent to our use of cookies in
            accordance with this policy.
          </p>

          <p className="pb-6 text-sm text-zinc-700">
            We use cookies for various purposes, including remembering your
            preferences, keeping you logged in, and analyzing site traffic. You
            can manage your cookie settings through your browser at any time,
            but please note that disabling cookies may affect the functionality
            of our website.
          </p>
        </div>
      </div>

      {/* Returns & Refunds */}
      <div className="mt-5">
        <h2
          className="uppercase pb-5 text-xl font-bold text-black"
          id="returnRefunds"
        >
          Returns & Refunds
        </h2>

        <div className="justify-center col-span-4 lg:col-span-8 lg:col-start-3">
          <h3 className="text-black mb-3 font-semibold">
            The Buyurparts Returns and Refunds Process
          </h3>
          <p className="pb-6 text-sm text-zinc-700">
            At Buyurparts, we understand that a seamless shopping experience is
            of paramount importance to our valued customers. That’s why we’ve
            put together this comprehensive guide to help you navigate the
            process of returns and refunds on Buyurparts with ease. In this
            article, we will provide you with a step-by-step breakdown of how to
            initiate a return, request a refund, and ensure your satisfaction as
            a buyer. Say goodbye to confusion and hello to hassle-free returns!
          </p>

          {/* Steps */}
          <div>
            <h3 className="text-black mb-3 font-semibold">
              <span className="text-gray-300 text-3xl mr-1">01</span>Initiating
              a Return
            </h3>
            <p className="pb-6 text-sm text-zinc-700 font-semibold">
              Returning an item on Buyurparts is a straightforward process. To
              get started, follow these steps:
            </p>
            <ul className="list-disc list-inside mb-4 text-sm  font-normal">
              <li className="mb-1">
                Log into Your Buyurparts Account: Ensure you are signed in to
                your Buyurparts account.
              </li>
              <li className="mb-1">
                Go to Your Purchase History: Click on “My Account” and navigate
                to your purchase history.
              </li>
              <li className="mb-1">
                Select the Item to Return: Locate the item you wish to return
                and click on “Return this item.”
              </li>
              <li className="mb-1">
                Choose a Return Reason: Buyurparts will prompt you to select a
                reason for your return. Be as specific as possible to expedite
                the process.
              </li>
              <li className="mb-1">
                Confirm the Return: Review your return request, and if
                everything looks good, confirm your return. Buyurparts will
                provide you with a prepaid return shipping label.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-black mb-3 font-semibold">
              <span className="text-gray-300 text-3xl mr-1">02</span>Requesting
              a Refund
            </h3>
            <p className="pb-6 text-sm text-zinc-700 font-semibold">
              Once your return is initiated and the seller receives the item,
              the refund process begins:
            </p>
            <ul className="list-disc list-inside mb-4 text-sm  font-normal">
              <li className="mb-1">
                Item Received by Seller: The seller will inspect the returned
                item.
              </li>
              <li className="mb-1">
                Refund Initiated: If the item is in its original condition, the
                seller will initiate a refund. Keep in mind that it may take a
                few days for the refund to appear in your account.
              </li>
              <li className="mb-1">
                Refund Received: Once processed, you will receive an email
                notification confirming your refund. The funds will be credited
                to your original payment method.
              </li>
            </ul>
          </div>

          <h3 className="text-black mb-3 font-semibold">
            Seller’s Return Policy
          </h3>

          <p className="pb-6 text-sm text-zinc-700">
            Each Buyurparts seller may have their own return policy. It’s
            essential to review the seller’s return policy before making a
            purchase. Understanding their terms will help you know what to
            expect in case you need to return an item.
          </p>

          <h3 className="text-black mb-3 font-semibold">
            Buyurparts Money Back Guarantee
          </h3>

          <p className="pb-6 text-sm text-zinc-700">
            Buyurparts provides a Money Back Guarantee, ensuring that you will
            receive the item you ordered or get your money back. If the item
            doesn’t match the seller’s description, Buyurparts has got you
            covered.
          </p>

          <h3 className="text-black mb-3 font-semibold">
            Tips for a Smooth Return and Refund Experience.
          </h3>

          <h5 className="text-black text-sm mb-3 font-semibold">
            Communicate with the Seller
          </h5>

          <p className="pb-6 text-sm text-zinc-700">
            In case you have any questions or concerns about the return process,
            don’t hesitate to reach out to the seller. Good communication can
            often resolve issues quickly and amicably.
          </p>

          <h5 className="text-black text-sm mb-3 font-semibold">
            Keep Records
          </h5>

          <p className="pb-6 text-sm text-zinc-700">
            Maintain records of all communication and tracking information
            related to your return. This documentation can be valuable if any
            disputes arise.
          </p>

          <h5 className="text-black text-sm mb-3 font-semibold">
            Timely Returns
          </h5>

          <p className="pb-6 text-sm text-zinc-700">
            Ensure that you return the item within the specified time-frame
            outlined in the seller’s return policy. Prompt returns increase the
            likelihood of a smooth refund process.
          </p>

          <h5 className="text-black text-sm mb-3 font-semibold">Be Honest</h5>

          <p className="pb-6 text-sm text-zinc-700">
            When initiating a return, be truthful about the condition of the
            item. Honesty fosters trust and can lead to a quicker resolution.
          </p>

          <h5 className="text-black text-sm mb-3 font-semibold">Conclusion</h5>

          <p className="pb-6 text-sm text-zinc-700">
            At Buyurparts, we believe that a successful shopping experience on
            Buyurparts should not be marred by the uncertainty of returns and
            refunds. By following the steps outlined in this guide and being
            aware of Buyurparts’ policies, you can enjoy a hassle-free
            experience as a buyer. Remember, Buyurparts is committed to
            protecting your interests through its Money Back Guarantee, ensuring
            your satisfaction with each purchase.
          </p>

          <p className="pb-6 text-sm text-zinc-700 flex items-center">
            So go ahead, shop with confidence, and rest assured that you have
            the knowledge to handle returns and refunds on Buyurparts like a
            pro. Happy shopping! <ShoppingBasket className="ml-2" />
          </p>
        </div>
      </div>

      {/* Shipping & Delivery */}

      <div className="mt-5">
        <h2
          className="uppercase pb-5 text-xl font-bold text-black"
          id="shippingDelivery"
        >
          Shipping & Delivery
        </h2>

        <div className="justify-center col-span-4 lg:col-span-8 lg:col-start-3">
          <p className="pb-6 text-sm text-zinc-700">
            Buyurparts.com partners with multiple vendors to bring you a wide
            range of automobile parts. Shipping times and costs may vary
            depending on the vendor and your location. Here’s what you can
            expect:
          </p>

          <ul className="list-disc list-inside mb-4 text-sm  font-normal">
            <li className="mb-1">
              <b>Processing Time:</b> Orders are typically processed within 1-3
              business days.
            </li>
            <li className="mb-1">
              <b>Shipping Options:</b> We offer various shipping options at
              checkout, allowing you to choose the best one for your needs.
            </li>
            <li className="mb-1">
              <b>Delivery Time:</b> Delivery times vary depending on the
              shipping method selected and your location. Most orders are
              delivered within 5-7 business days.
            </li>
            <li className="mb-1">
              <b>Tracking:</b> Once your order is shipped, you will receive a
              tracking number to monitor your delivery.
            </li>
          </ul>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
