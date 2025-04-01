
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface AudioMarker {
  type: 'critical' | 'violation' | 'positive';
  timestamp: number;
  description: string;
}

interface AudioPlayerProps {
  src: string;
  markers: AudioMarker[];
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, markers }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const jumpToTime = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const getMarkerColor = (type: AudioMarker['type']) => {
    switch (type) {
      case 'critical': return 'bg-red-500';
      case 'violation': return 'bg-orange-500';
      case 'positive': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const currentAlert = markers.find(marker => 
    currentTime >= marker.timestamp && currentTime < marker.timestamp + 3
  );

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-4">
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
        
        {currentAlert && (
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={currentAlert.type === 'positive' ? 'default' : 'destructive'}>
              {currentAlert.description}
            </Badge>
          </div>
        )}

        <div className="relative w-full h-2 bg-secondary rounded-full">
          <div
            className="absolute h-full bg-primary rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          
          {markers.map((marker, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={`absolute w-3 h-3 -top-1 rounded-full ${getMarkerColor(marker.type)} hover:scale-110 transition-transform`}
                    style={{ left: `${(marker.timestamp / duration) * 100}%` }}
                    onClick={() => jumpToTime(marker.timestamp)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{marker.description} - {formatTime(marker.timestamp)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            <Slider
              className="w-24"
              value={[volume * 100]}
              onValueChange={(value) => {
                const newVolume = value[0] / 100;
                setVolume(newVolume);
                if (audioRef.current) {
                  audioRef.current.volume = newVolume;
                }
              }}
            />
          </div>
        </div>

        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" /> Critical Alert
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-500" /> Script Violation
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500" /> Positive Moment
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;
