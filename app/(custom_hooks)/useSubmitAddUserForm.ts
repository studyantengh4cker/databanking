import { useState } from "react";

import { addDeanorProgramHead } from "@/actions/admin.action";
import { toast } from "@/hooks/use-toast";
import { AddUserFormData } from "@/components/forms/AddDeanForm";

export function useSubmitAddUserForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (values: AddUserFormData) => {
    try {
      setLoading(true);
      const res = await addDeanorProgramHead(values);

      if (res && res?.status !== "success") {
        console.log("RES: ", res);
        setError(true);
      } else {
        toast({
          title: `Add ${values.role} Account`,
          description: "Successfully added account!",
        });
      }
    } catch (err) {
      console.error(err);
      alert(err);
      setError(true);
    } finally {
      if (error) {
        toast({
          title: `Add ${values.role} Account`,
          description: "Failed adding account!",
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
