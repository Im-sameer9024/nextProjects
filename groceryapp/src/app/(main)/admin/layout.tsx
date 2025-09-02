import AdminNavbar from "@/components/Admin/AdminNavbar";
import SideBar from "@/components/Admin/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <AdminNavbar />
      </div>
      <div className="flex">
        <SideBar />
        <div>{children}</div>
      </div>
    </div>
  );
}
