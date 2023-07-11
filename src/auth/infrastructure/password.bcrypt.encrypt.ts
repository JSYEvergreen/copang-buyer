import { Injectable } from '@nestjs/common';
import { IPasswordEncrypt } from '../domain/password.encrypt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordBcryptEncrypt implements IPasswordEncrypt {
  async encrypt(rawPassword: string): Promise<string> {
    const salt = await PasswordBcryptEncrypt.generateSalt();
    return await bcrypt.hash(rawPassword, salt);
  }

  async compare(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(rawPassword, hashedPassword);
  }

  private static async generateSalt(): Promise<string> {
    const saltRound = 8;
    return await bcrypt.genSalt(saltRound);
  }
}
