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

export interface Reviewer {
  id: number;
  college: College;
  college_id: number;
  program: Program;
  program_id: number;
  reviewer_description: string;
  reviewer_name: string;
  school_year: string | null;
  topics: any[]; 
  created_at: string;
  updated_at: string;
}

export interface College {
  id: number;
  college_name: string;
  created_at: string;
  short_name: string;
  updated_at: string;
}

export interface Program {
  id: number;
  college_id: number;
  created_at: string;
  program_name: string;
  updated_at: string;
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

export interface Topic {
  id: number;
  program: Program;
  program_id: number;
  reviewer: Reviewer;
  reviewer_id: number;
  topic_name: string;
  topic_description: string;
  created_at: string;
  updated_at: string;
}

export interface Subtopic {
  id: number;
  subtopic_name: string;
  subtopic_description: string;
  topic_id: number;
  created_at: string;
}

export interface Choice {
  choice_index: string;
  choice_content: string;
}

export interface Question {
  id: number;
  question_content: string;
  question_point: string;
  correct_answer: string;
  subtopic_id: number;
  created_at: string;
  updated_at: string;
  choices: Choice[]; 
  subtopic: Subtopic; 
}