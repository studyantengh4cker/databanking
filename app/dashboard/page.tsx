import Header from "@/components/dashboard/colleges/Header";
import QuestionsForm from "@/components/forms/QuestionsForm";
// import UsersForm from "@/components/forms/UsersForm";

export default function DashboardPage() {
  return (
    <main className="p-10">
      <Header title="Dashboard" />
      <QuestionsForm reviewer_id={2} />
      {/* <UsersForm role="student"/> */}
      {/* <UsersForm role="faculty"/> */}
      {/* <UsersForm role="dean"/> */}
      {/* <UsersForm role="programhead"/> */}
    </main>
  );
}
