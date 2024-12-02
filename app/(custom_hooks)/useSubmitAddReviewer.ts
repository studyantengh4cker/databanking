import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { AddReviewerFormData } from "@/components/forms/AddReviewerForm";
import { addReviewer } from "@/actions/admin.action";


export function useSubmitAddReviewerForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (values: AddReviewerFormData) => {
    try {
      setLoading(true);
      const res = await addReviewer(values);

      if (!res || res?.status !== "success") {
        setError(true);
      } else {
        toast({
          title: `Add Reviewer`,
          description: "Successfully added reviewer!",
        });
      }
    } catch (err) {
      console.error(err);
      alert(err);
      setError(true);
    } finally {
      if (error) {
        toast({
          title: `Add Reviewer`,
          description: "Failed adding reviewer!",
        });
      }
      setError(false);
      setLoading(false);
    }
  };

  return {
    onSubmit,
    loading,
    error,
  };
}
