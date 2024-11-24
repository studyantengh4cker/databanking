export interface User {
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

  export interface Pagination {
    current_page: number;
    total_pages: number;
    total_items: number;
    per_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
  }
  