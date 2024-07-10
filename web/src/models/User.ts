import MediaApp from "./MediaApp";
import UserSettings from "./UserSettings";

export default class User {
  private id: number;
  private email: string;
  private username: string;
  private avatar?: MediaApp | null;
  private settings: UserSettings;
  private scores: number[];
  private scorePercentage: number;
  private lastScoreId: number;
  private isActive: boolean;
  private lastLogin: Date;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: number,
    email: string,
    username: string,
    avatar: MediaProps | null = null,
    settings: UserSettingsProps,
    scores: number[],
    scorePercentage: number,
    lastScoreId: number,
    isActive: boolean,
    lastLogin: string,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.avatar = avatar ? MediaApp.create(avatar) : null;
    this.settings = UserSettings.create(settings);
    this.scores = scores;
    this.scorePercentage = scorePercentage;
    this.lastScoreId = lastScoreId;
    this.isActive = isActive;
    this.lastLogin = new Date(lastLogin);
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }

  get getId() {
    return this.id;
  }

  get getEmail() {
    return this.email;
  }

  get getUsername() {
    return this.username;
  }

  get getAvatar() {
    return this.avatar;
  }

  get getSettings() {
    return this.settings;
  }

  get getScores() {
    return this.scores;
  }

  get getScorePercentage() {
    return this.scorePercentage;
  }

  get getLastScoreId() {
    return this.lastScoreId;
  }

  get getIsActive() {
    return this.isActive;
  }

  get getLastLogin() {
    return this.lastLogin;
  }

  get getCreatedAt() {
    return this.createdAt;
  }

  get getUpdatedAt() {
    return this.updatedAt;
  }

  set setEmail(email: string) {
    this.email = email;
  }

  set setUsername(username: string) {
    this.username = username;
  }

  static create(obj: UserProps) {
    return new User(
      obj.id,
      obj.email,
      obj.username,
      obj.avatar,
      obj.settings,
      obj.scores,
      obj.get_score_percentage,
      obj.get_last_score_id,
      obj.is_active,
      obj.last_login,
      obj.created_at,
      obj.updated_at
    );
  }
}
