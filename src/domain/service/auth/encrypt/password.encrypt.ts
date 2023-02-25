export interface IPasswordEncrypt {
  encrypt: (rawPassword: string) => Promise<string>;
  compare: (rawPassword: string, hashedPassword: string) => Promise<boolean>;
}
