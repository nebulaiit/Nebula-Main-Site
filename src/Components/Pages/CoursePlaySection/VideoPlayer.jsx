// Components/VideoPlayer.jsx
import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ videoRef, src, playbackRate, skipTime, changePlaybackRate }) => {
  const isValidSrc = src && src.trim() !== "";

  return (
    <div className="video-player-container">
      {isValidSrc ? (
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          className="video-player"
        />
      ) : (
        <div className="video-placeholder">
          <p>Loading video...</p>
        </div>
      )}

      <div className="video-controls">
        <div>
            <button onClick={() => skipTime(-10)} className='me-2'>⏪ 10s</button>
            <button onClick={() => skipTime(10)}>⏩ 10s</button>
        </div>

        <select value={playbackRate} onChange={(e) => changePlaybackRate(Number(e.target.value))}>
          {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
            <option key={rate} value={rate}>{rate}x</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VideoPlayer;