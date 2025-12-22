import AdminProtectedRoute from "@/components/auth/AdminProtectedRoute";

export default function AdminLayout({ children }) {
  return (
    <AdminProtectedRoute>
      {children}
    </AdminProtectedRoute>
  );
}
