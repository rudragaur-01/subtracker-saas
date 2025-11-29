import { MarketingNavbar } from "@/components/marketingComponents/MarketingNavbar";

export const metadata = {
  title: "Your SaaS Name",
  description: "Gym management platform",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className=" sticky top-0 z-50 bg-accent-foreground text-white">
        <MarketingNavbar />
      </header>
      <main className="flex-1 bg-gray-100">
       {children}
      </main>
    </div>
  );
}
