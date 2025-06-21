
import React from 'react';
import { Star, Clock, MapPin, Video, Phone, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DoctorCardProps {
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  price: string;
  image: string;
  isOnline: boolean;
  nextAvailable: string;
}

const DoctorCard = ({ 
  name, 
  specialty, 
  rating, 
  experience, 
  price, 
  image, 
  isOnline, 
  nextAvailable 
}: DoctorCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            <Avatar className="w-16 h-16">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                {name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 truncate">{name}</h4>
            <p className="text-sm text-gray-600">{specialty}</p>
            <div className="flex items-center space-x-1 mt-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">{rating}</span>
              <span className="text-sm text-gray-500">• {experience}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{nextAvailable}</span>
            </div>
            <Badge 
              variant={isOnline ? "default" : "secondary"}
              className={isOnline ? "bg-green-100 text-green-800" : ""}
            >
              {isOnline ? "Online" : "Offline"}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600">{price}</span>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">2.5 km away</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button size="sm" variant="outline" className="flex items-center space-x-1">
              <Video className="h-4 w-4" />
              <span>Video</span>
            </Button>
            <Button size="sm" variant="outline" className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </Button>
            <Button size="sm" variant="outline" className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>Chat</span>
            </Button>
          </div>

          <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
            Book Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
