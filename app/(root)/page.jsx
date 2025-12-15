"use client";

import { useSuperadminOverview } from '@/hooks/query/superadminOverview';

export default function Page() {
  const { data, isLoading, error } = useSuperadminOverview();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading overview</div>;

  console.log(data)

  return (
    <div>
      <h1>Overview</h1>
    </div>
  );
}
