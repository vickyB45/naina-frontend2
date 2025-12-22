import SuperAdminProtectedRoute from "@/components/auth/SuperAdminProtectedRoute";
import ClientLayout from "@/components/SuperAdmin/layout/ClientLayout";
import { Toaster } from "sonner";

export const metadata = {
  title: "Naina AI Agent",
  description: "AI agent dashboard frontend",
};

export default function RootLayout({ children }) {
  return (
    <div className="bg-background text-foreground min-h-screen">
       <SuperAdminProtectedRoute>
      <ClientLayout>
        {children}
      </ClientLayout>
    </SuperAdminProtectedRoute>
      </div>
  );
}
