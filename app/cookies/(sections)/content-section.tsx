export default function ContentSection() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none px-2 sm:px-4 md:px-6">
      <div className="space-y-8 text-[#212121] dark:text-gray-200">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-[#181411] dark:text-white">
            What Are Cookies?
          </h2>
          <p className="text-base leading-relaxed mb-4">
            Cookies are small text files that are placed on your computer or
            mobile device when you visit a website. They are widely used to make
            websites work more efficiently and provide information to the owners
            of the site.
          </p>
          <p className="text-base leading-relaxed">
            Cookies allow a website to recognize your device and store some
            information about your preferences or past actions. This helps us
            provide you with a better experience when you browse our website and
            also allows us to improve our site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-[#181411] dark:text-white">
            How We Use Cookies
          </h2>
          <p className="text-base leading-relaxed mb-4">
            Gelila Manufacturing PLC uses cookies for several purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li className="text-base leading-relaxed">
              Essential cookies: These cookies are necessary for the website to
              function properly. They enable core functionality such as
              security, network management, and accessibility.
            </li>
            <li className="text-base leading-relaxed">
              Analytics cookies: These cookies help us understand how visitors
              interact with our website by collecting and reporting information
              anonymously.
            </li>
            <li className="text-base leading-relaxed">
              Functional cookies: These cookies allow the website to remember
              choices you make and provide enhanced, more personal features.
            </li>
            <li className="text-base leading-relaxed">
              Marketing cookies: These cookies are used to track visitors across
              websites to display relevant advertisements.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-[#181411] dark:text-white">
            Types of Cookies We Use
          </h2>
          <div className="space-y-4 mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#181411] dark:text-white">
                Session Cookies
              </h3>
              <p className="text-base leading-relaxed">
                These are temporary cookies that are deleted when you close your
                browser. They help us remember what you did on a single visit to
                our website.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#181411] dark:text-white">
                Persistent Cookies
              </h3>
              <p className="text-base leading-relaxed">
                These cookies remain on your device for a set period or until
                you delete them. They help us remember your preferences and
                improve your experience across multiple visits.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#181411] dark:text-white">
                Third-Party Cookies
              </h3>
              <p className="text-base leading-relaxed">
                These are cookies set by domains other than Gelila Manufacturing
                PLC. We may use third-party services that set their own cookies
                to provide features such as analytics or social media
                integration.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-[#181411] dark:text-white">
            Managing Cookies
          </h2>
          <p className="text-base leading-relaxed mb-4">
            You have the right to decide whether to accept or reject cookies.
            You can exercise your cookie rights by setting your preferences in
            your browser settings.
          </p>
          <p className="text-base leading-relaxed mb-4">
            Most web browsers allow some control of most cookies through the
            browser settings. To find out more about cookies, including how to
            see what cookies have been set and how to manage and delete them,
            visit{" "}
            <a
              href="https://www.allaboutcookies.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              www.allaboutcookies.org
            </a>
            .
          </p>
          <p className="text-base leading-relaxed mb-4">
            Please note that blocking or deleting cookies may impact your
            experience on our website. Some features may not function properly
            if cookies are disabled.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-[#181411] dark:text-white">
            Browser-Specific Instructions
          </h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li className="text-base leading-relaxed">
              Chrome: Settings → Privacy and security → Cookies and other site
              data
            </li>
            <li className="text-base leading-relaxed">
              Firefox: Options → Privacy & Security → Cookies and Site Data
            </li>
            <li className="text-base leading-relaxed">
              Safari: Preferences → Privacy → Cookies and website data
            </li>
            <li className="text-base leading-relaxed">
              Edge: Settings → Privacy, search, and services → Cookies and site
              permissions
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-[#181411] dark:text-white">
            Updates to This Policy
          </h2>
          <p className="text-base leading-relaxed mb-4">
            We may update this Cookie Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. Please revisit this Cookie Policy regularly to
            stay informed about our use of cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-[#181411] dark:text-white">
            Contact Us
          </h2>
          <p className="text-base leading-relaxed">
            If you have any questions about our use of cookies or this Cookie
            Policy, please contact us at:
          </p>
          <p className="text-base leading-relaxed mt-2">
            Email: privacy@gelila.com
            <br />
            Phone: +251 123 456 789
            <br />
            Address: 123 Industrial Park, Addis Ababa, Ethiopia
          </p>
        </section>
      </div>
    </div>
  );
}
