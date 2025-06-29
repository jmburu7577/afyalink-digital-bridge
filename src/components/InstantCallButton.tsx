
import React from 'react';
import { Button } from '@/components/ui/button';
import { Video, Loader2, Search } from 'lucide-react';
import { useInstantCall } from '@/hooks/useInstantCall';

const InstantCallButton = () => {
  const { startInstantCall, loading, searchingDoctor } = useInstantCall();

  return (
    <Button 
      onClick={startInstantCall}
      disabled={loading}
      className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 transition-all duration-300"
    >
      {searchingDoctor ? (
        <>
          <Search className="h-6 w-6 mr-3 animate-pulse" />
          Finding Doctor...
        </>
      ) : loading ? (
        <>
          <Loader2 className="h-6 w-6 mr-3 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Video className="h-6 w-6 mr-3" />
          Start Instant Call
        </>
      )}
    </Button>
  );
};

export default InstantCallButton;
