import { nanoid } from 'nanoid';

interface NicknameParams {
  firstName: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  originCountry: string;
  existingNicknames: string[];
}

export function generateUniqueNickname(params: NicknameParams): string {
  const { firstName, age, gender, originCountry, existingNicknames } = params;
  
  // Extract first 2-3 letters from name
  const namePrefix = firstName.substring(0, Math.min(3, firstName.length)).toLowerCase();
  
  // Get country code (first 2 letters)
  const countryCode = originCountry.substring(0, 2).toUpperCase();
  
  // Gender indicator
  const genderCode = gender === 'M' ? 'M' : gender === 'F' ? 'F' : 'X';
  
  let attempt = 0;
  let nickname = '';
  
  do {
    if (attempt === 0) {
      // First attempt: Name + Age + Gender + Country
      nickname = `${namePrefix}${age}${genderCode}${countryCode}`;
    } else if (attempt === 1) {
      // Second attempt: Add random 2-digit number
      const randomNum = Math.floor(Math.random() * 99).toString().padStart(2, '0');
      nickname = `${namePrefix}${age}${genderCode}${countryCode}${randomNum}`;
    } else {
      // Further attempts: Use nanoid for uniqueness
      const uniqueId = nanoid(3);
      nickname = `${namePrefix}${age}${genderCode}${countryCode}${uniqueId}`;
    }
    
    attempt++;
  } while (existingNicknames.includes(nickname) && attempt < 10);
  
  // If still not unique after 10 attempts, use nanoid
  if (existingNicknames.includes(nickname)) {
    nickname = `${namePrefix}${nanoid(6)}`;
  }
  
  return nickname;
}

export function isNicknameUnique(nickname: string, existingNicknames: string[]): boolean {
  return !existingNicknames.includes(nickname);
}

// Example nicknames generated:
// João, 25, M, Portugal → joa25MPT
// Maria, 30, F, Brazil → mar30FBR
// Alex, 28, Other, USA → ale28XUS