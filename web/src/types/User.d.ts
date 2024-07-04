type UserProps = {
  id: number;
  email: string;
  username: string;
  email: string;
  settings: UserSettingsProps;
  get_avatar_url: string | null;
  get_total_score: number;
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
