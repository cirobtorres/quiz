type UserProps = {
  id: number;
  email: string;
  username: string;
  avatar: MediaProps;
  settings: UserSettingsProps;
  scores: number[];
  get_score_percentage: number;
  get_last_score_id: number;
  is_active: boolean;
  last_login: string;
  created_at: string;
  updated_at: string;
};

type UserSettingsProps = {
  id: number;
  quiz: number[];
  quiz_size: number;
  time_to_answer: number;
  updated_at: string;
};
