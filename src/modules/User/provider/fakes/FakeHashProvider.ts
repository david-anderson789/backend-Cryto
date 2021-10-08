import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }

  public async generateHash(payload: string): Promise<string> {
    return payload;
  }
}

export default BCryptHashProvider;
