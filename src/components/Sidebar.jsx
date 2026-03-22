import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Link as LinkIcon, MapPin, Smile } from 'lucide-react';

/**
 * Sidebar component displaying user profile details, achievements, and stats.
 * All profile elements are functional links to GitHub.
 */
const Sidebar = ({ profile, isDark }) => {
  if (!profile) return <div className="animate-pulse w-64 h-96 bg-gray-100 rounded-lg"></div>;

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full md:w-[296px] shrink-0"
    >
      <div className="relative group">
        <a href={`https://github.com/${profile.login}`} target="_blank" rel="noopener noreferrer">
          <motion.img 
            whileHover={{ scale: 1.02 }}
            src={profile.avatar_url} 
            alt={profile.name || profile.login} 
            className={`w-full aspect-square rounded-full border ${isDark ? 'border-[#30363d]' : 'border-[#d0d7de]'} shadow-sm cursor-pointer`}
          />
        </a>
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className={`absolute bottom-10 right-0 ${isDark ? 'bg-[#161b22] border-[#30363d]' : 'bg-white border-[#d0d7de]'} border rounded-full p-2 shadow-sm cursor-pointer transition-colors`}
        >
           <Smile size={16} className="text-[#57606a]" />
        </motion.div>
      </div>
      
      <div className="mt-4">
        <a href={`https://github.com/${profile.login}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#0969da]">
          <h1 className={`text-[26px] font-semibold leading-tight ${isDark ? 'text-[#e6edf3]' : 'text-[#24292f]'} transition-colors`}>
            {profile.name || profile.login}
          </h1>
          <p className="text-xl font-light text-[#57606a]">
            {profile.login}
          </p>
        </a>
      </div>

      <a href={`https://github.com/${profile.login}`} target="_blank" rel="noopener noreferrer" className="block w-full mt-4">
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-1.5 px-3 ${isDark ? 'bg-[#21262d] border-[#30363d] hover:bg-[#30363d]' : 'bg-[#f6f8fa] border-[#d0d7de] hover:bg-[#ebeff2]'} border rounded-md text-sm font-semibold transition-colors shadow-sm`}
        >
          Edit profile
        </motion.button>
      </a>

      <div className="mt-4 flex items-center space-x-1 text-sm text-[#57606a]">
        <Users size={14} />
        <a href={`https://github.com/${profile.login}?tab=followers`} target="_blank" rel="noopener noreferrer" className="hover:text-[#0969da] flex items-center space-x-1">
          <span className={`font-semibold ${isDark ? 'text-[#e6edf3]' : 'text-[#24292f]'}`}>{profile.followers}</span>
          <span>followers</span>
        </a>
        <span className="mx-1">·</span>
        <a href={`https://github.com/${profile.login}?tab=following`} target="_blank" rel="noopener noreferrer" className="hover:text-[#0969da] flex items-center space-x-1">
          <span className={`font-semibold ${isDark ? 'text-[#e6edf3]' : 'text-[#24292f]'}`}>{profile.following}</span>
          <span>following</span>
        </a>
      </div>

      <div className="mt-8">
        <h3 className={`font-semibold mb-3 ${isDark ? 'text-[#e6edf3]' : 'text-[#24292f]'}`}>Achievements</h3>
        <div className="flex flex-wrap gap-2">
          <a href={`https://github.com/${profile.login}?tab=achievements`} target="_blank" rel="noopener noreferrer">
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
              className={`w-16 h-16 rounded-full ${isDark ? 'bg-[#161b22] border-[#30363d]' : 'bg-orange-50 border-orange-100'} flex items-center justify-center p-2 border shadow-sm cursor-pointer`}
            >
               <img src="https://github.githubassets.com/assets/yolo-badge-default-87053531f82e.png" alt="YOLO Badge" title="YOLO" className="w-full" />
            </motion.div>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
