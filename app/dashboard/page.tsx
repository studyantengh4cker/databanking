import Header from "@/components/dashboard/colleges/Header";
import UserForm from "@/components/forms/UserForm";

export default function DashboardPage() {
  return (
    <main className="p-10">
      <Header title="Dashboard" />
      <UserForm />
    </main>
  );
}
