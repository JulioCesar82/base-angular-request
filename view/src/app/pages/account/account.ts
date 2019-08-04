export class Account {
  public firstname: string;
  public lastname: string;
  public username: string;
  public role: string;
}

export class TokenLogado {
  public expires: string;
  public token: string;
  public user: Account;
}
