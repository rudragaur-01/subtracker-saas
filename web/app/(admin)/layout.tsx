

export const metadata = {
  title: "Your SaaS Name",
  description: "Gym management platform",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
