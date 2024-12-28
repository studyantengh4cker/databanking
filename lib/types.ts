export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  api_token: string;
  college_id: number;
  program_id:number;
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
  id: number;
  choice_content: string;
  choice_index: string; 
  question_id: number; 
  created_at: string; 
  updated_at: string; 
}

export interface Question {
  id: number;
  question_content: string;
  choices: Choice[];
  correct_answer: string;
  question_point: string;
  reviewer_id: number;
  subtopic: string | null;
  subtopic_id: string | null;
  topic: string | null;
  topic_id: string | null;
  created_at: string; 
  updated_at: string; 
}


export interface ReviewerQuestion {
  id: number;
  question_content: string;
  choices: Choice[];
  correct_answer: string;
  question_point: string;
  reviewer_id: number;
  subtopic: string | null;
  subtopic_id: string | null;
  topic: string | null;
  topic_id: string | null;
  status: 'not_answered' | 'answered';
  isFlagged: boolean;
  created_at: string; 
  updated_at: string; 
}



