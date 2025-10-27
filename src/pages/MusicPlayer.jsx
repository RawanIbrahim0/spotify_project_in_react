import React, { useRef, useState, useEffect, useCallback } from "react";

// تأكد من صحة مسارات الملفات لديك
import sampleSong from "/assets/audio/All-of-me.mp3";
import albumCover from "/assets/img/all-of-me.jpeg";
import ParticleBackground from "../components/ParticleBackground";

// =====================================================================
// بيانات كلمات الأغنية كما هي
const LYRICS_DATA = [
  { time: 4.0, text: "Press Play to start the music and lyrics..." },
  { time: 9.0, text: "What would I do without your smart mouth" },
  { time: 13.0, text: "Drawing me in, and you kicking me out" },
  {
    time: 17.0,
    text: "Got my head spinning, no kidding, I can't pin you down",
  },
  { time: 22.0, text: "What's going on in that beautiful mind" },
  { time: 26.0, text: "I'm on your magical mystery ride" },
  {
    time: 30.0,
    text: "And I'm so dizzy, don't know what hit me, but I'll be alright",
  },
  { time: 34.5, text: "My head's under water" },
  { time: 38.0, text: "But I'm breathing fine" },
  { time: 41.0, text: "You're crazy and I'm out of my mind" },
  { time: 46.0, text: "'Cause all of me loves all of you" },
  { time: 50.0, text: "Love your curves and all your edges" },
  { time: 54.0, text: "All your perfect imperfections" },
  { time: 58.5, text: "Give your all to me, I'll give my all to you" },
  { time: 63.0, text: "You're my end and my beginning" },
  { time: 67.5, text: "Even when I lose I'm winning" },
  { time: 72.0, text: "'Cause I give you all of me" },
  { time: 75.0, text: "And you give me all of you, oh" },
];


const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentLyric, setCurrentLyric] = useState(LYRICS_DATA[0].text);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);

      const activeLyricEntry = LYRICS_DATA.find((lyric, index) => {
        const startTime = lyric.time;
        const nextLyric = LYRICS_DATA[index + 1];
        const endTime = nextLyric ? nextLyric.time : duration;

        return time >= startTime && time < endTime;
      });

      if (activeLyricEntry && activeLyricEntry.text !== currentLyric) {
        setCurrentLyric(activeLyricEntry.text);
      } else if (!activeLyricEntry && time >= duration && duration > 0) {
        setCurrentLyric("Song finished. Press play to restart.");
      }
    }
  }, [duration, currentLyric]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (e) => {
    const seekTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const progressPercent = (currentTime / duration) * 100 || 0;

  return (
    <div>
      <div className="relative min-h-screen">
        <ParticleBackground />
        {/* الشفافية فوق الخلفية */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundColor: "rgba(30, 39, 73, 0.6)",
            zIndex: 0,
          }}
        />
        <div className="relative z-100 ml-20 w-[80%]  flex items-center justify-center
         min-h-screen ">
          {/* مشغل الموسيقى (Extra Wide Card) */}
          <div
            // تم تغيير العرض الأقصى إلى max-w-6xl
            className="bg-[#273469ff] p-6 ml-[400px] rounded-xl  shadow-2xl max-w-6xl w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 transform transition duration-500 "
          >
            {/* عنصر Audio الفعلي (مخفي) */}
            <audio
              ref={audioRef}
              src={sampleSong}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
            />

            {/* 1. غلاف الأغنية (Cover) - على اليسار */}
            <div className="md:w-1/3 flex-shrink-0 flex justify-center">
              <img
                src={albumCover}
                alt="All of Me Album Cover"
                className="w-full h-auto max-w-[250px] md:max-w-full rounded-lg shadow-xl aspect-square object-cover border-4 border-violet-300"
              />
            </div>

            {/* 2. منطقة تفاصيل الأغنية والتحكم - على اليمين */}
            <div className="md:w-2/3 flex flex-col justify-between text-left">
              {/* اسم المطرب والأغنية */}
              <div className="mb-4">
                <h2 className="text-5xl font-extrabold text-violet-300">
                  All of Me
                </h2>
                <p className="text-2xl text-gray-100">John Legend</p>
              </div>

              {/* الكلمات المتزامنة (Lyrics) - حجم خط أكبر */}
              <div className="min-h-[4rem] flex items-center mb-8">
                <p
                  key={currentLyric}
                  // زيادة حجم الخط للكلمات (text-3xl)
                  className="text-3xl font-bold text-[#e4d9ffff] transition-opacity duration-300 opacity-100"
                >
                  {currentLyric}
                </p>
              </div>

              {/* قسم التحكم: شريط التقدم والأزرار */}
              <div className="mt-auto">
                {/* شريط التقدم (Progress Bar) مع الوقت */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-sm text-gray-100 flex-shrink-0">
                    {formatTime(currentTime)}
                  </span>

                  <div
                    className="flex-grow h-2 rounded-full cursor-pointer overflow-hidden bg-slate-700"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-100 ease-linear bg-violet-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>

                  <span className="text-sm text-gray-100 flex-shrink-0">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* أزرار التحكم - (في المنتصف الآن) */}
                <div className="flex justify-center items-center space-x-6">
                  {/* زر الرجوع 10 ثواني */}
                  <button
                    className="p-2 rounded-full transition duration-300 text-violet-300 hover:text-white"
                    onClick={() => {
                      if (audioRef.current) audioRef.current.currentTime -= 10;
                    }}
                    aria-label="Skip Back 10 Seconds"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {/* زر التشغيل/الإيقاف (الأهم) */}
                  <button
                    className="p-4 rounded-full shadow-xl transform hover:scale-110 transition duration-300 bg-violet-300 text-slate-900"
                    onClick={togglePlayPause}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>

                  {/* زر التقديم 10 ثواني */}
                  <button
                    className="p-2 rounded-full transition duration-300 text-violet-300 hover:text-white"
                    onClick={() => {
                      if (audioRef.current) audioRef.current.currentTime += 10;
                    }}
                    aria-label="Skip Forward 10 Seconds"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 19l7-7-7-7m-8 14l7-7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
