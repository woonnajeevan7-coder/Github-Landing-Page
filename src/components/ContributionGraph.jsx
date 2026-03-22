import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { githubService } from '../services/githubService';

const ContributionGraph = ({ isDark }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetches real contribution data from the proxy API.
     * This provides the count for the heatmap.
     */
    const fetchContribs = async () => {
      try {
        const result = await githubService.getContributions();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch contributions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContribs();
  }, []);

  if (loading) return <div className="h-[200px] animate-pulse bg-gray-100 dark:bg-[#161b22] rounded-md mb-8"></div>;
  if (!data) return null;

  const { contributions, totalContributions } = data;

  // GitHub colors (approx)
  const colorsLight = {
    'NONE': '#ebedf0',
    'FIRST_QUARTILE': '#9be9a8',
    'SECOND_QUARTILE': '#40c463',
    'THIRD_QUARTILE': '#30a14e',
    'FOURTH_QUARTILE': '#216e39'
  };

  const colorsDark = {
    'NONE': '#161b22',
    'FIRST_QUARTILE': '#0e4429',
    'SECOND_QUARTILE': '#006d32',
    'THIRD_QUARTILE': '#26a641',
    'FOURTH_QUARTILE': '#39d353'
  };

  const currentColors = isDark ? colorsDark : colorsLight;

  // Extract month labels based on the first day of each week
  const monthLabels = [];
  contributions.forEach((week, i) => {
    const firstDay = new Date(week[0].date);
    const month = firstDay.toLocaleString('en-US', { month: 'short' });
    if (i === 0 || new Date(contributions[i-1][0].date).getMonth() !== firstDay.getMonth()) {
      monthLabels.push({ month, index: i });
    }
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-3 px-2">
        <h3 className={`text-sm font-normal ${isDark ? 'text-[#e6edf3]' : 'text-[#24292f]'}`}>
          {totalContributions} contributions in the last year
        </h3>
        <div className="flex items-center text-xs text-[#57606a] cursor-pointer hover:text-[#0969da]">
          Contribution settings <ChevronDown size={14} className="ml-1" />
        </div>
      </div>
      
      <div className={`border ${isDark ? 'border-[#30363d] bg-[#0d1117]' : 'border-[#d0d7de] bg-white'} rounded-md p-6 overflow-x-auto relative min-h-[160px] shadow-sm`}>
        <div className="flex">
          {/* Main Graph Area */}
          <div className="flex flex-col flex-grow">
            {/* Month Labels */}
            <div className="flex text-[10px] text-[#57606a] mb-2 pl-8 h-4 relative">
              {monthLabels.map((lbl, i) => (
                <span 
                  key={i} 
                  className="absolute" 
                  style={{ left: `${lbl.index * 13 + 32}px` }}
                >
                  {lbl.month}
                </span>
              ))}
            </div>
            
            <div className="flex items-start">
              <div className="flex flex-col text-[10px] text-[#57606a] mr-2 h-[88px] justify-between pt-1 w-6">
                <span className="h-3"></span>
                <span>Mon</span>
                <span className="h-3"></span>
                <span>Wed</span>
                <span className="h-3"></span>
                <span>Fri</span>
                <span className="h-3"></span>
              </div>
              
              <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
                {contributions.flat().map((day, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + (i * 0.0005) }}
                    className={`w-[10px] h-[10px] rounded-[2px] transition-colors hover:ring-1 hover:ring-[#0969da] cursor-pointer`}
                    style={{ backgroundColor: currentColors[day.contributionLevel] }}
                    title={`${day.contributionCount} contributions on ${day.date}`}
                  ></motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Year selector sidebar */}
          <div className="ml-8 flex flex-col space-y-1 shrink-0">
            <button className="px-3 py-1 bg-[#0969da] text-white text-[11px] rounded-md font-semibold text-center w-12">2026</button>
            <button className={`px-3 py-1 ${isDark ? 'hover:bg-[#161b22]' : 'hover:bg-[#f6f8fa]'} text-[#57606a] text-[11px] rounded-md font-semibold text-center w-12 transition-colors`}>2025</button>
          </div>
        </div>
        
        {/* Footer Area */}
        <div className="mt-4 flex justify-between w-full pl-8 items-center text-[10px] text-[#57606a]">
          <a href="#" className="hover:text-[#0969da] cursor-pointer">Learn how we count contributions</a>
          <div className="flex items-center space-x-1">
            <span>Less</span>
            {['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'].map(lvl => (
              <div key={lvl} className={`w-2.5 h-2.5 rounded-[2px]`} style={{ backgroundColor: currentColors[lvl] }}></div>
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContributionGraph;
