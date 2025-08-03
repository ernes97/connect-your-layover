import { TravelCode } from '../types';

// Airport code to country mapping (sample data - in real app would be from API)
const AIRPORT_COUNTRY_MAP: Record<string, string> = {
  'LIS': 'Portugal',
  'MAD': 'Spain', 
  'CDG': 'France',
  'LHR': 'United Kingdom',
  'FRA': 'Germany',
  'AMS': 'Netherlands',
  'FCO': 'Italy',
  'ZUR': 'Switzerland',
  'VIE': 'Austria',
  'ARN': 'Sweden',
  'CPH': 'Denmark',
  'OSL': 'Norway',
  'HEL': 'Finland',
  'WAW': 'Poland',
  'PRG': 'Czech Republic',
  'BUD': 'Hungary',
  'OTP': 'Romania',
  'SOF': 'Bulgaria',
  'ATH': 'Greece',
  'IST': 'Turkey',
  'JFK': 'United States',
  'LAX': 'United States',
  'ORD': 'United States',
  'DFW': 'United States',
  'ATL': 'United States',
  'YYZ': 'Canada',
  'YVR': 'Canada',
  'GRU': 'Brazil',
  'GIG': 'Brazil',
  'EZE': 'Argentina',
  'SCL': 'Chile',
  'LIM': 'Peru',
  'BOG': 'Colombia',
  'MEX': 'Mexico',
  'NRT': 'Japan',
  'ICN': 'South Korea',
  'PVG': 'China',
  'BKK': 'Thailand',
  'SIN': 'Singapore',
  'DXB': 'UAE',
  'DOH': 'Qatar',
  'CAI': 'Egypt',
  'JNB': 'South Africa',
  'SYD': 'Australia',
  'AKL': 'New Zealand'
};

export interface TravelCodeInput {
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  layoverAirport: string;
  layoverStartTime: string; // ISO date string
  layoverEndTime: string; // ISO date string
}

export function parseTravelCode(input: TravelCodeInput): TravelCode | null {
  try {
    const {
      flightNumber,
      departureAirport,
      arrivalAirport,
      layoverAirport,
      layoverStartTime,
      layoverEndTime
    } = input;

    // Validate airport codes (3-letter IATA codes)
    const airportCodeRegex = /^[A-Z]{3}$/;
    if (!airportCodeRegex.test(departureAirport) || 
        !airportCodeRegex.test(arrivalAirport) || 
        !airportCodeRegex.test(layoverAirport)) {
      return null;
    }

    // Validate flight number format (airline code + number)
    const flightNumberRegex = /^[A-Z]{2}\d{1,4}$/;
    if (!flightNumberRegex.test(flightNumber)) {
      return null;
    }

    const layoverStart = new Date(layoverStartTime);
    const layoverEnd = new Date(layoverEndTime);

    // Validate dates
    if (isNaN(layoverStart.getTime()) || isNaN(layoverEnd.getTime())) {
      return null;
    }

    // Validate layover duration (must be between 30 minutes and 24 hours)
    const layoverDuration = layoverEnd.getTime() - layoverStart.getTime();
    const minLayover = 30 * 60 * 1000; // 30 minutes
    const maxLayover = 24 * 60 * 60 * 1000; // 24 hours

    if (layoverDuration < minLayover || layoverDuration > maxLayover) {
      return null;
    }

    // Get country for layover airport
    const layoverCountry = AIRPORT_COUNTRY_MAP[layoverAirport];
    if (!layoverCountry) {
      return null;
    }

    return {
      flightNumber,
      departureAirport,
      arrivalAirport,
      layoverAirport,
      layoverStart,
      layoverEnd,
      layoverCountry
    };
  } catch (error) {
    console.error('Error parsing travel code:', error);
    return null;
  }
}

export function isValidLayoverTime(layoverStart: Date, layoverEnd: Date): boolean {
  const now = new Date();
  const layoverDuration = layoverEnd.getTime() - layoverStart.getTime();
  
  // Layover must be in the future
  if (layoverStart.getTime() <= now.getTime()) {
    return false;
  }
  
  // Layover must be between 30 minutes and 24 hours
  const minLayover = 30 * 60 * 1000; // 30 minutes
  const maxLayover = 24 * 60 * 60 * 1000; // 24 hours
  
  return layoverDuration >= minLayover && layoverDuration <= maxLayover;
}

export function getAirportCountry(airportCode: string): string | null {
  return AIRPORT_COUNTRY_MAP[airportCode] || null;
}

export function isLayoverActive(layoverStart: Date, layoverEnd: Date): boolean {
  const now = new Date();
  return now >= layoverStart && now <= layoverEnd;
}

export function getLayoverTimeRemaining(layoverEnd: Date): number {
  const now = new Date();
  return Math.max(0, layoverEnd.getTime() - now.getTime());
}