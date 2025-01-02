import Header from "@/components/dashboard/colleges/Header";
import QuestionsForm from "@/components/forms/QuestionsForm";

export default function DashboardPage() {
  return (
    <main className="p-10">
      <Header title="Dashboard" />
      <QuestionsForm reviewer_id={2} />
    </main>
  );
}
