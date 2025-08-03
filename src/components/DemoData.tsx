import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { layoverStore } from '../store/layoverStore';
import { Users, Database } from 'lucide-react';

export function DemoData() {
  const addDemoUsers = () => {
    // Demo user 1 - CDG layover
    layoverStore.createUser(
      'João',
      28,
      'M',
      'Portugal',
      ['Portuguese', 'English', 'Spanish'],
      {
        flightNumber: 'TP441',
        departureAirport: 'LIS',
        arrivalAirport: 'JFK',
        layoverAirport: 'CDG',
        layoverStart: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        layoverEnd: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
        layoverCountry: 'France'
      }
    );

    // Demo user 2 - CDG layover (same as user 1)
    layoverStore.createUser(
      'Maria',
      32,
      'F',
      'Brazil',
      ['Portuguese', 'English', 'French'],
      {
        flightNumber: 'AF447',
        departureAirport: 'GRU',
        arrivalAirport: 'LHR',
        layoverAirport: 'CDG',
        layoverStart: new Date(Date.now() + 1.5 * 60 * 60 * 1000), // 1.5 hours from now
        layoverEnd: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
        layoverCountry: 'France'
      }
    );

    // Demo user 3 - CDG layover (same as users 1 & 2)
    layoverStore.createUser(
      'Alex',
      25,
      'Other',
      'Canada',
      ['English', 'French'],
      {
        flightNumber: 'AC874',
        departureAirport: 'YYZ',
        arrivalAirport: 'FCO',
        layoverAirport: 'CDG',
        layoverStart: new Date(Date.now() + 2.5 * 60 * 60 * 1000), // 2.5 hours from now
        layoverEnd: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
        layoverCountry: 'France'
      }
    );

    // Demo user 4 - Different airport (FRA)
    layoverStore.createUser(
      'Hans',
      35,
      'M',
      'Germany',
      ['German', 'English'],
      {
        flightNumber: 'LH456',
        departureAirport: 'MUC',
        arrivalAirport: 'JFK',
        layoverAirport: 'FRA',
        layoverStart: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
        layoverEnd: new Date(Date.now() + 7 * 60 * 60 * 1000), // 7 hours from now
        layoverCountry: 'Germany'
      }
    );

    // Demo user 5 - Same airport as user 4 (FRA)
    layoverStore.createUser(
      'Sophie',
      29,
      'F',
      'Netherlands',
      ['Dutch', 'English', 'German'],
      {
        flightNumber: 'KL842',
        departureAirport: 'AMS',
        arrivalAirport: 'LAX',
        layoverAirport: 'FRA',
        layoverStart: new Date(Date.now() + 2.8 * 60 * 60 * 1000), // 2.8 hours from now
        layoverEnd: new Date(Date.now() + 6.5 * 60 * 60 * 1000), // 6.5 hours from now
        layoverCountry: 'Germany'
      }
    );

    alert('Demo users created successfully! Now you can test the layover matching system.');
  };

  const stats = layoverStore.getStats();

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Demo Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="font-bold text-2xl text-blue-600">{stats.activeUsers}</div>
            <div className="text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-2xl text-green-600">{stats.layoverMatches}</div>
            <div className="text-muted-foreground">Matches</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-2xl text-purple-600">{stats.privateChats}</div>
            <div className="text-muted-foreground">Private Chats</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-2xl text-orange-600">{stats.groupChats}</div>
            <div className="text-muted-foreground">Group Chats</div>
          </div>
        </div>
        
        <Button 
          onClick={addDemoUsers}
          className="w-full flex items-center gap-2"
        >
          <Users className="w-4 h-4" />
          Add Demo Users
        </Button>
        
        <div className="text-xs text-muted-foreground">
          This will create 5 demo users with overlapping layovers in CDG and FRA airports for testing.
        </div>
      </CardContent>
    </Card>
  );
}