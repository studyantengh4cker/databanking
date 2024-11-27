import {
  UseFormWatch,
  UseFormGetValues,
  UseFormGetFieldState,
  UseFormSetError,
  UseFormClearErrors,
  UseFormTrigger,
  FormState,
  UseFormResetField,
  UseFormReset,
  UseFormHandleSubmit,
  UseFormUnregister,
  Control,
  UseFormRegister,
  UseFormSetFocus,
} from "react-hook-form";
import { College } from "../dashboard/colleges/Colleges";

export const useHandleCollegeChange = (
  form: {
    watch?: UseFormWatch<{
      college_id: string;
      program_id: string;
      idnum: string;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
      year_level: string | null;
      password: string;
      password_confirmation: string;
      phone_number: string;
    }>;
    getValues?: UseFormGetValues<{
      college_id: string;
      program_id: string;
      idnum: string;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
      year_level: string | null;
      password: string;
      password_confirmation: string;
      phone_number: string;
    }>;
    getFieldState?: UseFormGetFieldState<{
      college_id: string;
      program_id: string;
      idnum: string;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
      year_level: string | null;
      password: string;
      password_confirmation: string;
      phone_number: string;
    }>;
    setError?: UseFormSetError<{
      college_id: string;
      program_id: string;
      idnum: string;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
      year_level: string | null;
      password: string;
      password_confirmation: string;
      phone_number: string;
    }>;
    clearErrors?: UseFormClearErrors<{
      college_id: string;
      program_id: string;
      idnum: string;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
      year_level: string | null;
      password: string;
      password_confirmation: string;
      phone_number: string;
    }>;
    setValue: any;
    trigger?: UseFormTrigger<{
      college_id: string;
      program_id: string;
      idnum: string;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
      year_level: string | null;
      password: string;
      password_confirmation: string;
      phone_number: string;
    }>;
    formState?: FormState<{
      college_id: string;
      program_id: string;
      idnum: string;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
      year_level: string | null;
      password: string;
      password_confirmation: string;
      phone_number: string;
    }>;
    resetField?: UseFormResetField<{
      college_id: string;
      program_id: string;
      idnum: string;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
      year_level: string | null;
      password: string;
      password_confirmation: string;
      phone_number: string;
    }>;
    reset?: UseFormReset<{
      college_id: string;
      program_id: string;
      idnum: string;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
      year_level: string | null;
      password: string;
      password_confirmation: string;
      phone_number: string;
    }>;
    handleSubmit?: UseFormHandleSubmit<
      {
        college_id: string;
        program_id: string;
        idnum: string;
        first_name: string;
        last_name: string;
        email: string;
        role: string;
        year_level: string | null;
        password: string;
        password_confirmation: string;
        phone_number: string;
      },
      undefined
    >;
    unregister?: UseFormUnregister<{
      college_id: string;
      program_id: string;
      idnum: string;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
      year_level: string | null;
      password: string;
      password_confirmation: string;
      phone_number: string;
    }>;
    control?: Control<
      {
        college_id: string;
        program_id: string;
        idnum: string;
        first_name: string;
        last_name: string;
        email: string;
        role: string;
        year_level: string | null;
        password: string;
        password_confirmation: string;
        phone_number: string;
      },
      any
    >;
    register?: UseFormRegister<{
      college_id: string;
      program_id: string;
      idnum: string;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
      year_level: string | null;
      password: string;
      password_confirmation: string;
      phone_number: string;
    }>;
    setFocus?: UseFormSetFocus<{
      college_id: string;
      program_id: string;
      idnum: string;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
      year_level: string | null;
      password: string;
      password_confirmation: string;
      phone_number: string;
    }>;
  },
  setCollege: (selected: College | undefined) => void,
  colleges: College[],
  value: string
) => {
  const selected = colleges.find((c) => c.id === value);
  setCollege(selected);

  form.setValue("college_id", value);

  form.setValue("program_id", "");
};
