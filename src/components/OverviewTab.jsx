import React from 'react';
import RepoGrid from './RepoGrid';
import ContributionGraph from './ContributionGraph';
import ActivityTimeline from './ActivityTimeline';
import { RepoCardSkeleton, GraphSkeleton } from './SkeletonLoader';

/**
 * Container for the Overview tab content: Pinned Repos, Heatmap, and Activity.
 */
const OverviewTab = ({ repos, activity, loading, isDark }) => {
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2,3,4,5,6].map(i => <RepoCardSkeleton key={i} />)}
        </div>
        <GraphSkeleton />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <RepoGrid repos={repos} isDark={isDark} />
      <ContributionGraph isDark={isDark} />
      <ActivityTimeline activities={activity} isDark={isDark} />
    </div>
  );
};

export default OverviewTab;
