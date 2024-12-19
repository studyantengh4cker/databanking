import { getAllReviewers } from "@/actions/reviewer.action";

export async function Reviewers() {
  const reviewers = await getAllReviewers();

  return (
    <section>
      <pre>{JSON.stringify(reviewers, null, 2)}</pre>
    </section>
  );
}
