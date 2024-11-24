interface User {
    id: number;
    idnum: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    college_id: string | null;
    program_id: number | null;
    year_level: number | null;
    email_verified_at: Date | null;
    password: string;
    remember_token: string | null;
    created_at: Date;
    updated_at: Date;
  }
  