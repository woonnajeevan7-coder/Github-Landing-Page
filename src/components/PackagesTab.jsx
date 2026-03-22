import React from 'react';
import { Box } from 'lucide-react';

const PackagesTab = ({ isDark }) => (
  <div className={`py-20 text-center border ${isDark ? 'border-[#30363d]' : 'border-[#d0d7de]'} rounded-lg mt-8 animate-in fade-in duration-500`}>
    <div className="bg-[#f6f8fa] dark:bg-[#161b22] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
       <Box size={24} className="text-[#57606a]" />
    </div>
    <h3 className="font-semibold text-lg">You don’t have any packages yet.</h3>
    <p className="text-[#57606a] text-sm">Publish packages to share your code with others.</p>
    <a 
      href="https://docs.github.com/en/packages" 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block mt-4 text-[#0969da] hover:underline text-sm font-semibold"
    >
      Learn more about GitHub Packages
    </a>
  </div>
);

export default PackagesTab;
