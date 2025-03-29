import AdminRoute from "../../components/auth/AdminAuth";
import AuthProvider from "../../components/AuthSessionProvider";
import { Header } from "../../components/header";
import { Sidebar } from "../../components/sidebar";
import Providers from "../store/Providers";

export default function DashboardLayout({ children }) {
  return (
    <Providers>
      <AuthProvider>
        <AdminRoute>
          <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <div className="lg:pl-64">
              <Header />
              <main className="p-6">{children}</main>
            </div>
          </div>
        </AdminRoute>
      </AuthProvider>
    </Providers>
  );
}
