import { useEffect, useState } from "react";

const ProfilePic = ({ contacts, loading }) => {
  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);
  

  // ✅ Auto rotate
  useEffect(() => {
    if (!contacts.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % contacts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [contacts.length]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2); // 📱 mobile
      } else {
        setItemsPerView(5); // 💻 desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const visible = contacts.concat(contacts).slice(index, index + itemsPerView);

  // skelton
  if (loading) {
    return (
      <div className="text-center px-4 py-10 md:p-20 animate-pulse">
        {/* Title */}
        <div className="h-8 w-48 mx-auto mb-10 bg-white/10 rounded"></div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
          {[...Array(itemsPerView)].map((_, i) => (
            <div
              key={i}
              className="bg-white/10 border border-white/10 rounded-2xl 
                       p-3 md:p-5 w-36 md:w-48 mx-auto"
            >
              {/* Image */}
              <div className="w-20 h-20 md:w-32 md:h-32 mx-auto rounded-full bg-white/10"></div>

              {/* Name */}
              <div className="h-4 w-3/4 mx-auto mt-4 bg-white/10 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="text-center 
      bg-gradient-to-r from-blue-500/10 via-cyan-500/5 to-purple-500/10 
      px-4 py-10 md:p-20"
    >
      {/* 🔥 Title */}
      <h2
        className="text-2xl md:text-4xl font-bold mb-6 md:mb-10 
        bg-gradient-to-r from-cyan-400 to-blue-500 
        bg-clip-text text-transparent"
      >
        Our Members
      </h2>

      {/* 🔥 Container */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 justify-center">
        {visible.map((member) => (
          <div
            key={member._id}
            className="backdrop-blur-xl bg-white/10 border border-white/20 
                       rounded-2xl p-3 md:p-5 w-36 md:w-48
                       shadow-[0_0_20px_rgba(0,255,255,0.2)]
                       hover:shadow-[0_0_40px_rgba(0,255,255,0.6)]
                       transition-all duration-500 hover:-translate-y-2"
          >
            {/* 🌟 Image */}
            <img
              src={member.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt={member.name}
              className="w-20 h-20 md:w-32 md:h-32 mx-auto rounded-full object-cover 
              border-2 border-cyan-400
              shadow-[0_0_10px_cyan]
              md:shadow-[0_0_20px_cyan]
              transition-all duration-500
              hover:scale-110"
            />

            {/* 👤 Name */}
            <p className="mt-2 md:mt-3 text-xs md:text-sm font-semibold text-white tracking-wide">
              {member.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePic;
