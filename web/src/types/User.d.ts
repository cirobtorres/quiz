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
  last_login: Date;
  created_at: Date;
  updated_at: Date;
};

type UserSettingsProps = {
  id: number;
  quiz: number[];
  quiz_size: number;
  time_to_answer: number;
  updated_at: Date;
};
