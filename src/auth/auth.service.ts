import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly apiKeys = new Map<string, string>();

  register(dto: RegisterDto) {
    const apiKey = randomUUID();
    this.apiKeys.set(apiKey, dto.email);

    return {
      apiKey,
      name: dto.name,
      email: dto.email,
    };
  }

  isValidKey(apiKey: string): boolean {
    return this.apiKeys.has(apiKey);
  }
}
