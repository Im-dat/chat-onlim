import React, { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';
import { Camera, Mic, MicOff, Video, VideoOff, PhoneOff, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function VideoCall({ onClose }: { onClose: () => void }) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { currentUser } = useApp();

  useEffect(() => {
    const startMedia = async () => {
      try {
        const constraints = {
          video: true,
          audio: true
        };

        // First try with both video and audio
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
          setError(null);
        } catch (err) {
          // If that fails, try with just audio
          try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setStream(audioStream);
            setIsVideoOff(true);
            setError("Camera not available. Using audio only.");
          } catch (audioErr) {
            // If even audio fails, set error state
            setError("No media devices found. Please check your camera and microphone permissions.");
          }
        }
      } catch (err) {
        console.error('Media device error:', err);
        setError("Failed to access media devices. Please check your permissions.");
      }
    };

    startMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleMute = () => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks.forEach(track => {
          track.enabled = !track.enabled;
        });
        setIsMuted(!isMuted);
      }
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks.forEach(track => {
          track.enabled = !track.enabled;
        });
        setIsVideoOff(!isVideoOff);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-4 w-full max-w-2xl">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 flex items-center gap-2 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="relative">
          {stream && stream.getVideoTracks().length > 0 ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full rounded-lg bg-gray-900"
            />
          ) : (
            <div className="w-full h-64 rounded-lg bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  {currentUser?.username?.[0]?.toUpperCase() || '?'}
                </div>
                <p className="text-gray-400">
                  {isVideoOff ? 'Camera is turned off' : 'No video available'}
                </p>
              </div>
            </div>
          )}
          <div className="absolute bottom-4 left-4">
            <div className="bg-gray-900 bg-opacity-75 px-3 py-1 rounded-lg">
              <span className="text-white">{currentUser?.username}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-4">
          {stream?.getAudioTracks().length > 0 && (
            <button
              onClick={toggleMute}
              className={`p-3 rounded-full ${
                isMuted ? 'bg-red-500' : 'bg-gray-700'
              } hover:bg-opacity-80`}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
          )}
          
          {stream?.getVideoTracks().length > 0 && (
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${
                isVideoOff ? 'bg-red-500' : 'bg-gray-700'
              } hover:bg-opacity-80`}
            >
              {isVideoOff ? (
                <VideoOff className="w-6 h-6" />
              ) : (
                <Video className="w-6 h-6" />
              )}
            </button>
          )}
          
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-red-500 hover:bg-red-600"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}