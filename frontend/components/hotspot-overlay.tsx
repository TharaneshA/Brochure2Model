"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ExternalLink, Volume2 } from "lucide-react"
import { useState, useEffect } from 'react';
import useSound from 'use-sound';



interface Hotspot {
  id: string
  feature_title: string
  feature_description: string
  matched_part_name?: string
}

interface HotspotOverlayProps {
  hotspot: Hotspot
  position: { x: number; y: number }
  onClose: () => void
}

interface PlayAudioButtonProps {
  text: string;
}

function PlayAudioButton({ text }: PlayAudioButtonProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [play, { stop, isPlaying }] = useSound(audioUrl || '', {
    onend: () => setAudioUrl(null), // Clear URL after playing
    format: ['mp3']
  }) as unknown as [() => void, { stop: () => void; isPlaying: boolean }];

  useEffect(() => {
    // Cleanup function to stop audio if component unmounts or text changes
    return () => {
      if (isPlaying) {
        stop();
      }
    };
  }, [text, isPlaying, stop]);

  const handlePlay = async () => {
    if (isPlaying) {
      stop();
      setAudioUrl(null);
      return;
    }

    if (audioUrl) {
      play();
      return;
    }

    try {
      // Replace with your actual backend URL
      const response = await fetch('http://localhost:8000/generate-tts-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const audioBlob = base64toBlob(data.audio_content, 'audio/mp3');
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      play();
    } catch (error) {
      console.error('Error fetching TTS audio:', error);
      // Optionally, show a toast notification to the user
    }
  };

  // Helper function to convert base64 to Blob
  const base64toBlob = (base64: string, type: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: type });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePlay}
      className="border-gray-600 text-gray-300 hover:bg-gray-800 font-['Inter'] bg-transparent"
      disabled={!text} // Disable if no text to play
    >
      <Volume2 className="h-3 w-3 mr-1" />
      {isPlaying ? 'Stop Audio' : 'Play Audio'}
    </Button>
  );
}

export function HotspotOverlay({ hotspot, position, onClose }: HotspotOverlayProps) {
  if (!hotspot.feature_title && !hotspot.feature_description) {
    return null;
  }

  return (
    <div
      className="absolute z-50 w-80 pointer-events-auto"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -100%)",
      }}
    >
      <Card className="bg-gray-900/95 backdrop-blur-sm border-gray-700 shadow-2xl">
        <CardContent className="p-4 max-h-60 overflow-y-auto">
          {(hotspot.feature_title || hotspot.feature_description) ? (
            <>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-white font-['Inter']">{hotspot.feature_title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 h-auto"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed font-['Inter'] mb-4">{hotspot.feature_description}</p>
              <div className="flex gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-['Inter']">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Learn More
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 font-['Inter'] bg-transparent"
                >
                  Share
                </Button>
                <PlayAudioButton text={hotspot.feature_description} />
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
      {/* Arrow pointing to hotspot */}
      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full">
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-700"></div>
      </div>
    </div>
  )
}
