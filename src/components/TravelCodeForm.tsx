import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plane, Clock, MapPin, User, Globe, Languages } from 'lucide-react';
import { parseTravelCode } from '../utils/travelCodeParser';
import { useCreateUser } from '../hooks/useLayoverStore';

const LANGUAGE_OPTIONS = [
  'Portuguese', 'English', 'Spanish', 'French', 'German', 'Italian', 
  'Dutch', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 
  'Hindi', 'Turkish', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Polish'
];

const COUNTRY_OPTIONS = [
  'Portugal', 'Spain', 'France', 'Germany', 'Italy', 'Netherlands', 
  'United Kingdom', 'United States', 'Canada', 'Brazil', 'Argentina', 
  'Mexico', 'Japan', 'South Korea', 'China', 'Australia', 'New Zealand', 
  'Sweden', 'Norway', 'Denmark', 'Finland', 'Poland', 'Czech Republic'
];

interface TravelCodeFormProps {
  onSuccess: () => void;
}

export function TravelCodeForm({ onSuccess }: TravelCodeFormProps) {
  const { createUser } = useCreateUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    age: '',
    gender: '' as 'M' | 'F' | 'Other' | '',
    originCountry: '',
    languages: [] as string[],
    
    // Travel Information
    flightNumber: '',
    departureAirport: '',
    arrivalAirport: '',
    layoverAirport: '',
    layoverStartTime: '',
    layoverEndTime: ''
  });

  const handleLanguageChange = (language: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      languages: checked 
        ? [...prev.languages, language]
        : prev.languages.filter(l => l !== language)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.firstName || !formData.age || !formData.gender || 
          !formData.originCountry || formData.languages.length === 0) {
        throw new Error('Please fill in all personal information fields');
      }

      if (!formData.flightNumber || !formData.departureAirport || 
          !formData.arrivalAirport || !formData.layoverAirport || 
          !formData.layoverStartTime || !formData.layoverEndTime) {
        throw new Error('Please fill in all travel information fields');
      }

      // Parse and validate travel code
      const travelCode = parseTravelCode({
        flightNumber: formData.flightNumber.toUpperCase(),
        departureAirport: formData.departureAirport.toUpperCase(),
        arrivalAirport: formData.arrivalAirport.toUpperCase(),
        layoverAirport: formData.layoverAirport.toUpperCase(),
        layoverStartTime: formData.layoverStartTime,
        layoverEndTime: formData.layoverEndTime
      });

      if (!travelCode) {
        throw new Error('Invalid travel information. Please check your flight details and times.');
      }

      // Create user
      const user = createUser(
        formData.firstName,
        parseInt(formData.age),
        formData.gender,
        formData.originCountry,
        formData.languages,
        travelCode
      );

      console.log('User created:', user);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Plane className="w-8 h-8 text-blue-600" />
            Layover Connect
          </CardTitle>
          <CardDescription>
            Connect with fellow travelers during your layover. Enter your travel details to find others at the same airport.
          </CardDescription>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              This information helps generate your unique nickname and match you with others.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="João"
                  required
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="16"
                  max="99"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="25"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value: 'M' | 'F' | 'Other') => 
                  setFormData(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="originCountry">Origin Country</Label>
                <Select onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, originCountry: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRY_OPTIONS.map(country => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-3">
                <Languages className="w-4 h-4" />
                Languages You Speak (select all that apply)
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {LANGUAGE_OPTIONS.map(language => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={language}
                      checked={formData.languages.includes(language)}
                      onCheckedChange={(checked) => 
                        handleLanguageChange(language, checked as boolean)
                      }
                    />
                    <Label htmlFor={language} className="text-sm">
                      {language}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Travel Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Travel Information
            </CardTitle>
            <CardDescription>
              Enter your flight details and layover information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="flightNumber">Flight Number</Label>
              <Input
                id="flightNumber"
                value={formData.flightNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, flightNumber: e.target.value }))}
                placeholder="TP123"
                className="uppercase"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="departureAirport">Departure Airport</Label>
                <Input
                  id="departureAirport"
                  value={formData.departureAirport}
                  onChange={(e) => setFormData(prev => ({ ...prev, departureAirport: e.target.value }))}
                  placeholder="LIS"
                  className="uppercase"
                  maxLength={3}
                  required
                />
              </div>
              <div>
                <Label htmlFor="layoverAirport">Layover Airport</Label>
                <Input
                  id="layoverAirport"
                  value={formData.layoverAirport}
                  onChange={(e) => setFormData(prev => ({ ...prev, layoverAirport: e.target.value }))}
                  placeholder="CDG"
                  className="uppercase"
                  maxLength={3}
                  required
                />
              </div>
              <div>
                <Label htmlFor="arrivalAirport">Final Destination</Label>
                <Input
                  id="arrivalAirport"
                  value={formData.arrivalAirport}
                  onChange={(e) => setFormData(prev => ({ ...prev, arrivalAirport: e.target.value }))}
                  placeholder="JFK"
                  className="uppercase"
                  maxLength={3}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="layoverStartTime" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Layover Start Time
                </Label>
                <Input
                  id="layoverStartTime"
                  type="datetime-local"
                  value={formData.layoverStartTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, layoverStartTime: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="layoverEndTime" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Layover End Time
                </Label>
                <Input
                  id="layoverEndTime"
                  type="datetime-local"
                  value={formData.layoverEndTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, layoverEndTime: e.target.value }))}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? 'Connecting...' : 'Start Connecting'}
        </Button>
      </form>
    </div>
  );
}