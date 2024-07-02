export class UserExists extends Error {
  public status: number;
  public type: string;

  constructor(
    message: string,
    type: string = "Bad Credentials",
    status: number = 400
  ) {
    super(message);
    this.type = type;
    this.status = status;
  }
}

export class BadCredentialsException extends Error {
  public status: number;
  public type: string;

  constructor(
    message = "Usuário ou senha incorreto(s)",
    type = "Bad Credentials",
    status = 400
  ) {
    super(message);
    this.type = type;
    this.status = status;
  }
}

export class UnauthorizedException extends Error {
  public message: string;
  public status: number;
  public type: string;

  constructor(
    message = "Usuário não existe",
    type = "Unauthorized",
    status = 401
  ) {
    super(message);
    this.message = message;
    this.type = type;
    this.status = status;
  }
}
