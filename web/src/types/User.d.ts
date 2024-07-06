type UserProps = {
  id: number;
  email: string;
  username: string;
  get_avatar_url: string;
  settings: UserSettingsProps;
  get_score: number;
  total_score: number[];
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
