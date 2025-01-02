import { fetchReviewer } from "@/actions/reviewer.action";
import Header from "@/components/dashboard/colleges/Header";
import { auth } from "@/lib/auth";
import { colleges } from "@/lib/Colleges";
import Topics from "./Topics";

export default async function ReviewerPage() {
  const session = await auth();

  if (!session) return;

  const college = colleges.find(
    (c) => parseInt(c.id) === session.user.college_id
  );
  const program = college?.programs.find(
    (p) => parseInt(p.id) === session.user.program_id
  );

  if (!college || !program) return;

  const reviewer = await fetchReviewer(
    parseInt(college.id),
    parseInt(program.id)
  );

  return (
    <main>
      <Header title="Reviewer" />
      <Topics reviewerId={reviewer.id} />
    </main>
  );
}
