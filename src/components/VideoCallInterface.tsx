
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { useVideoCalls } from '@/hooks/useVideoCalls';
import { useToast } from '@/hooks/use-toast';

interface VideoCallInterfaceProps {
  appointmentId: string;
  isDoctor?: boolean;
}

const VideoCallInterface: React.FC<VideoCallInterfaceProps> = ({ appointmentId, isDoctor = false }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [callStatus, setCallStatus] = useState<'waiting' | 'active' | 'ended'>('waiting');
  const [roomId, setRoomId] = useState<string>('');
  
  const { createVideoCall, startVideoCall, endVideoCall } = useVideoCalls();
  const { toast } = useToast();

  const handleStartCall = async () => {
    try {
      const result = await createVideoCall(appointmentId);
      if (result.data) {
        setRoomId(result.data.room_id);
        setCallStatus('active');
        await startVideoCall(result.data.id);
      }
    } catch (error) {
      console.error('Error starting call:', error);
    }
  };

  const handleEndCall = async () => {
    try {
      // In a real implementation, you'd have the call ID stored
      setCallStatus('ended');
      toast({
        title: "Call ended",
        description: "The video call has been ended."
      });
    } catch (error) {
      console.error('Error ending call:', error);
    }
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Video Consultation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Video Area */}
          <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
            {callStatus === 'waiting' ? (
              <div className="flex items-center justify-center h-full text-white">
                <div className="text-center">
                  <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Ready to start video call</p>
                  {isDoctor && (
                    <Button onClick={handleStartCall} className="mt-4">
                      Start Call
                    </Button>
                  )}
                </div>
              </div>
            ) : callStatus === 'active' ? (
              <div className="flex items-center justify-center h-full text-white">
                <div className="text-center">
                  <Video className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg">Video call in progress</p>
                  <p className="text-sm opacity-75">Room: {roomId}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                <div className="text-center">
                  <PhoneOff className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Call ended</p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          {callStatus === 'active' && (
            <div className="flex justify-center space-x-4">
              <Button
                variant={isVideoOn ? "default" : "destructive"}
                size="lg"
                onClick={toggleVideo}
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
              
              <Button
                variant={isAudioOn ? "default" : "destructive"}
                size="lg"
                onClick={toggleAudio}
              >
                {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="destructive"
                size="lg"
                onClick={handleEndCall}
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Call Info */}
          <div className="text-center text-sm text-gray-600">
            <p>Status: {callStatus}</p>
            {callStatus === 'active' && (
              <p className="text-green-600">✓ Connected</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCallInterface;
