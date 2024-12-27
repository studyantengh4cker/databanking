import Header from "@/components/dashboard/colleges/Header";
import UsersForm from "@/components/forms/UsersForm";

export default function DashboardPage() {
  return (
    <main className="p-10">
      <Header title="Dashboard" />
      <UsersForm role="admin" />
    </main>
  );
}
