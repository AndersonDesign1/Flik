import { PeopleDirectory } from "@/components/super-admin/people-directory";
import { fetchAuthQuery } from "@/lib/auth-server";
import { api } from "../../../../convex/_generated/api";

export const dynamic = "force-dynamic";

export default async function SuperAdminPeoplePage() {
  const directory = await fetchAuthQuery(
    api.platform.getSuperAdminPeopleDirectory
  );

  return (
    <PeopleDirectory people={directory.people} summary={directory.summary} />
  );
}
