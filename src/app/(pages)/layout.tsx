import { type ReactNode } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import AuthGuard from "@/components/AuthGuard";

const PagesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthGuard>
      <div className="flex h-full overflow-hidden bg-slate-50">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
};

export default PagesLayout;
