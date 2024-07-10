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
    avatar: MediaApp | null = null,
    settings: UserSettings,
    scores: number[],
    scorePercentage: number,
    lastScoreId: number,
    isActive: boolean,
    lastLogin: Date,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.avatar = avatar;
    this.settings = settings;
    this.scores = scores;
    this.scorePercentage = scorePercentage;
    this.lastScoreId = lastScoreId;
    this.isActive = isActive;
    this.lastLogin = lastLogin;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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
    try {
      return new User(
        obj.id,
        obj.email,
        obj.username,
        MediaApp.create(obj.avatar),
        UserSettings.create(obj.settings),
        obj.scores,
        obj.get_score_percentage,
        obj.get_last_score_id,
        obj.is_active,
        obj.last_login,
        new Date(obj.created_at),
        new Date(obj.updated_at)
      );
    } catch (error) {
      // obj.avatar = null -> TypeError (user has no avatar)
    }
    return new User(
      obj.id,
      obj.email,
      obj.username,
      null,
      UserSettings.create(obj.settings),
      obj.scores,
      obj.get_score_percentage,
      obj.get_last_score_id,
      obj.is_active,
      obj.last_login,
      new Date(obj.created_at),
      new Date(obj.updated_at)
    );
  }
}
