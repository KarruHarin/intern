import React, { useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';
import { Socket } from 'socket.io-client';
import { useUser } from '@/app/context/userContext';
import { Phone, PhoneOff, Video, VideoOff, MicOff, Mic } from 'lucide-react';

interface VideoCallProps {
  socket: any;
  setIsVideoCallActive: (active: boolean) => void;
  clientId: string | null;
  doctorId: string | null;
}

const VideoCall: React.FC<VideoCallProps> = ({ socket, setIsVideoCallActive, clientId, doctorId }) => {
  const [me, setMe] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [receivingCall, setReceivingCall] = useState<boolean>(false);
  const [caller, setCaller] = useState<string>('');
  const [callerSignal, setCallerSignal] = useState<Peer.SignalData | null>(null);
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [idToCall, setIdToCall] = useState<string>('');
  const [callEnded, setCallEnded] = useState<boolean>(false);
  const [name, setName] = useState<string>('Someone');
  const { id } = useUser();
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }
    });

    let userIds = [clientId, doctorId];
    socket.emit('getSocketIds', userIds);

    socket.on("socketIds", (socketIds) => {
      setMe(socketIds[id]);
      if (doctorId === id) {
        setIdToCall(socketIds[clientId]);
      } else {
        setIdToCall(socketIds[doctorId]);
      }
    });

    socket.on('callUser', (data: { from: string; name: string; signal: Peer.SignalData }) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    return () => {
      socket.off('socketIds');
      socket.off('callUser');
    };
  }, [socket, id, clientId, doctorId]);

  const callUser = (id: string) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream || undefined,
    });

    peer.on('signal', (data: Peer.SignalData) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on('stream', (userStream: MediaStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = userStream;
      }
    });

    socket.on('callAccepted', (signal: Peer.SignalData) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream || undefined,
    });

    peer.on('signal', (data: Peer.SignalData) => {
      socket.emit('answerCall', { signal: data, to: caller });
    });

    peer.on('stream', (userStream: MediaStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = userStream;
      }
    });

    if (callerSignal) {
      peer.signal(callerSignal);
    }
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    setIsVideoCallActive(false);
  };

  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
      setIsVideoOff(!isVideoOff);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Video Call</h1>
          
          <div className="flex justify-center items-center mb-6 space-x-4">
            <button
              onClick={toggleMute}
              className={`p-3 rounded-full ${
                isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-200 hover:bg-gray-300'
              } transition-colors duration-200`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MicOff className="text-white" /> : <Mic className="text-gray-700" />}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${
                isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-200 hover:bg-gray-300'
              } transition-colors duration-200`}
              title={isVideoOff ? "Turn on video" : "Turn off video"}
            >
              {isVideoOff ? <VideoOff className="text-white" /> : <Video className="text-gray-700" />}
            </button>
            {callAccepted && !callEnded ? (
              <button
                onClick={leaveCall}
                className="p-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200"
                title="End call"
              >
                <PhoneOff className="text-white" />
              </button>
            ) : (
              <button
                onClick={() => callUser(idToCall)}
                className="p-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-200"
                title="Start call"
              >
                <Phone className="text-white" />
              </button>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative w-full md:w-1/2 aspect-video bg-gray-200 rounded-lg overflow-hidden">
              {stream && (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  playsInline
                  muted
                  ref={myVideo}
                  autoPlay
                />
              )}
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                You
              </div>
            </div>
            <div className="relative w-full md:w-1/2 aspect-video bg-gray-200 rounded-lg overflow-hidden">
              {callAccepted && !callEnded ? (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  playsInline
                  ref={userVideo}
                  autoPlay
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Waiting for connection...</p>
                </div>
              )}
              {callAccepted && !callEnded && (
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  {name}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {receivingCall && !callAccepted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4">{name} is calling...</h2>
            <button
              onClick={answerCall}
              className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
            >
              Answer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;