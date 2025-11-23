import Link from "next/link";
import {
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Customers", icon: Users, href: "/admin/customers" },
   { label: "Create New Customer", icon: Users, href: "/admin/new-customer" },
  { label: "Remainders", icon: MessageSquare, href: "/admin/remainders" },
  { label: "Your Plan", icon: CreditCard, href: "/admin/your-plan" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

const AdminSidebar = () => {
  return (
    <div className="sticky left-0 flex flex-col p-4 top-16 h-[calc(100vh-68px)]">
      <div className="flex flex-col space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.label} href={item.href}>
              <div className="flex items-center gap-3 cursor-pointer p-3 rounded hover:bg-[var(--sidebar-accent)]">
                <Icon size={20} color="var(--sidebar-foreground)" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSidebar;
