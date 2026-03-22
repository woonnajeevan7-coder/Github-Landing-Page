/**
 * Set of reusable skeleton loading components to ensure 
 * a smooth UX during GitHub API data fetching.
 */

import React from 'react';

export const ProfileSkeleton = () => (
    <div className="w-full md:w-[296px] animate-pulse">
        <div className="w-full aspect-square rounded-full bg-gray-200 dark:bg-[#161b22] mb-4"></div>
        <div className="h-8 bg-gray-200 dark:bg-[#161b22] rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-200 dark:bg-[#161b22] rounded w-1/2 mb-8"></div>
        <div className="h-10 bg-gray-200 dark:bg-[#161b22] rounded w-full"></div>
    </div>
);

export const RepoCardSkeleton = () => (
    <div className="p-4 border border-[#d0d7de] dark:border-[#30363d] rounded-md h-[120px] animate-pulse">
        <div className="h-5 bg-gray-200 dark:bg-[#161b22] rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-[#161b22] rounded w-3/4"></div>
    </div>
);

export const GraphSkeleton = () => (
    <div className="w-full h-40 bg-gray-200 dark:bg-[#161b22] rounded-md animate-pulse mt-8"></div>
);

export const ListSkeleton = ({ count = 4 }) => (
    <div className="space-y-4 animate-pulse">
        {[...Array(count)].map((_, i) => (
            <div key={i} className="py-6 border-b border-[#d0d7de] dark:border-[#30363d]">
                <div className="h-6 bg-gray-200 dark:bg-[#161b22] rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-[#161b22] rounded w-1/2"></div>
            </div>
        ))}
    </div>
);
