import { useState, useRef, useEffect } from 'react';
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer.jsx';

export const VolumeControl = ({ className = "", orientation = "horizontal" }) => {
  const [showSlider, setShowSlider] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  
  const { 
    volume, 
    isMuted, 
    changeVolume, 
    toggleMute 
  } = useAudioPlayer();

  // Handle volume slider interaction
  const handleVolumeChange = (e) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    let percentage;
    
    if (orientation === "vertical") {
      percentage = 1 - ((e.clientY - rect.top) / rect.height);
    } else {
      percentage = (e.clientX - rect.left) / rect.width;
    }
    
    const newVolume = Math.max(0, Math.min(1, percentage));
    changeVolume(newVolume);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleVolumeChange(e);
    
    const handleMouseMove = (e) => {
      handleVolumeChange(e);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Get appropriate volume icon
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return VolumeX;
    if (volume < 0.3) return Volume;
    if (volume < 0.7) return Volume1;
    return Volume2;
  };

  const VolumeIcon = getVolumeIcon();
  const volumePercentage = volume * 100;

  return (
    <div 
      className={`relative flex items-center ${className}`}
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => !isDragging && setShowSlider(false)}
    >
      {/* Volume Button */}
      <button
        onClick={toggleMute}
        className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        <VolumeIcon className="h-5 w-5" />
      </button>

      {/* Volume Slider */}
      <div className={`
        transition-all duration-200 overflow-hidden
        ${orientation === "vertical" 
          ? `absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 ${
              showSlider ? 'h-24 opacity-100' : 'h-0 opacity-0'
            }`
          : `${showSlider ? 'w-20 ml-3 opacity-100' : 'w-0 ml-0 opacity-0'}`
        }
      `}>
        <div 
          ref={sliderRef}
          className={`
            relative bg-slate-600 rounded-full cursor-pointer
            ${orientation === "vertical" 
              ? 'w-1 h-24' 
              : 'h-1 w-full'
            }
          `}
          onMouseDown={handleMouseDown}
        >
          {/* Volume fill */}
          <div 
            className={`
              absolute bg-white rounded-full transition-all duration-100
              ${orientation === "vertical"
                ? 'w-full bottom-0'
                : 'h-full left-0'
              }
            `}
            style={
              orientation === "vertical"
                ? { height: `${volumePercentage}%` }
                : { width: `${volumePercentage}%` }
            }
          />
          
          {/* Volume handle */}
          <div 
            className={`
              absolute w-3 h-3 bg-white rounded-full transform transition-opacity duration-200
              ${showSlider || isDragging ? 'opacity-100' : 'opacity-0'}
              ${orientation === "vertical"
                ? '-translate-x-1/2 left-1/2'
                : '-translate-y-1/2 top-1/2'
              }
            `}
            style={
              orientation === "vertical"
                ? { 
                    bottom: `calc(${volumePercentage}% - 6px)`,
                    left: '50%'
                  }
                : { 
                    left: `calc(${volumePercentage}% - 6px)`,
                    top: '50%'
                  }
            }
          />
        </div>
        
        {/* Volume percentage tooltip */}
        {(showSlider || isDragging) && (
          <div className={`
            absolute text-xs bg-slate-800 text-white px-2 py-1 rounded shadow-lg pointer-events-none
            ${orientation === "vertical"
              ? 'top-0 left-full ml-2'
              : 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
            }
          `}>
            {Math.round(volumePercentage)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default VolumeControl;