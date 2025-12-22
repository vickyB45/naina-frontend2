"use client";

import { handleTenantLogin } from '@/api/admin.api';
import { useSuperadminOverview } from '@/hooks/query/superadminOverview';

export default function Page() {
  const { data, isLoading, error } = useSuperadminOverview();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading overview</div>;

  return (
    <div>
      <h1>Website page</h1>
    </div>
  );
}
