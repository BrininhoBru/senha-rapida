import { Injectable } from '@angular/core';
import { CharSets } from '../models/CharSets';
import { PasswordOptions } from '../models/PasswordOptions';
import { PASSWORD_CHARACTERS } from '../models/PasswordCharacteres';

@Injectable({
  providedIn: 'root'
})
export class PasswordGenerator {

  generatePassword(options: PasswordOptions): string {
    const { passwordLength, uppercase, lowercase, numbers, symbols } = options;

    const charSets = [
      uppercase ? PASSWORD_CHARACTERS.UPPERCASE : '',
      lowercase ? PASSWORD_CHARACTERS.LOWERCASE : '',
      numbers ? PASSWORD_CHARACTERS.NUMBERS : '',
      symbols ? PASSWORD_CHARACTERS.SYMBOLS : '',
    ].filter(set => set.length > 0);

    const passwordChars: string[] = [];

    if (options.passwordLength > charSets.length) {
      for (const set of charSets) {
        passwordChars.push(set[this.secureRandomInt(set.length)]);
      }
    }

    const allChars = charSets.join('');

    while (passwordChars.length < passwordLength) {
      passwordChars.push(allChars[this.secureRandomInt(allChars.length)]);
    }

    for (let i = passwordChars.length - 1; i > 0; i--) {
      const j = this.secureRandomInt(i + 1);
      [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
    }

    return passwordChars.join('');
  }

  private secureRandomInt(max: number): number {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  }
}
