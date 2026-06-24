import { type ReactNode } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const PagesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default PagesLayout;
