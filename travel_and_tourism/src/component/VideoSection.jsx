import React, { useState, useEffect } from 'react';

const VideoSection = () => {

  // const [vedio, setVedio] = useState('https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg');
  // const fetchVideo = async () => {
  //   try {
  //     const token = sessionStorage.getItem('token');
  //     if (!token) return;
  //     const response = await axios.get('https://res.cloudinary.com/dfkivdmqo/video/upload/v1733223911/video/iy5jicveb2plxqneptnt.mp4')
  //     console.log(response.data);
  //     if (response.data && response.data) {
  //       setVedio(response.data);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user profile:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchVideo();
  // }, []);


  return (
    <div className="relative video-container">
      {/* Video Background */}
      <video
        className="w-full h-screen object-cover"
        src='https://res.cloudinary.com/dfkivdmqo/video/upload/v1733223911/video/iy5jicveb2plxqneptnt.mp4' // Ensure the correct path
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>

      {/* Text Overlay */}
      <div className="absolute inset-x-0 top-10 flex items-center justify-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-nunito bg-gradient-to-r from-orange-500 via-gray-200 to-green-700 bg-clip-text text-transparent text-center">
          Welcome to Indore
        </h1>
      </div>

      {/* White Shadow at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>

      {/* Gradient Shadow at Top */}
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-green-50 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default VideoSection;
