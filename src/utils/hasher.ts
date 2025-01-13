import * as bcrypt from "bcrypt";

class Hasher {
  static saltRounds = 10;

  static hash(originalText: string): string {
    return bcrypt.hashSync(originalText, this.saltRounds);
  }

  static compare(normalText: string, hashedText: string): boolean {
    return bcrypt.compareSync(normalText, hashedText);
  }
}

export default Hasher;
