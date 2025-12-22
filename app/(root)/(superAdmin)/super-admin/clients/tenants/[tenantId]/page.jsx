
import TenantClient from "./TenantClient";

const Page = async ({ params }) => {
  const { tenantId } = await params;

  return <TenantClient tenantId={tenantId} />;
};

export default Page;
