import type { Metadata } from "next";
import { Suspense } from "react";
import { SettingsPageClient } from "./settings-page-client";

export const metadata: Metadata = {
  title: "Account Settings | Gelila Dashboard",
};

export default async function SettingsPage() {
  return (
    <Suspense>
      <SettingsPageClient />
    </Suspense>
  );
}


