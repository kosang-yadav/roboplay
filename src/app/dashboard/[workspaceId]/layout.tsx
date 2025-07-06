import { authenticateUser } from "@/actions/user";
import { verifyAccessToWorkspace } from "@/actions/workspace";
import { redirect } from "next/navigation";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

const Layout = async ({ params: { workspaceId }, children }: Props) => {
  const auth = await authenticateUser();

  if (!auth.user?.workspace || !auth.user?.workspace.length)
    redirect("auth/sign-in");

  const hasAccess = await verifyAccessToWorkspace(workspaceId);

  if (hasAccess.status !== 200)
    redirect(`/dashboard/${auth.user.workspace[0].name}`);

  if (!hasAccess.data?.workspace) return null;

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: getWorkspaceFolders(workspaceId),
  });

  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: getUserVideos(workspaceId),
  });

  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: getWorkspaces(),
  });

  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: getNotifications(),
  });

  return <div>Layout</div>;
};

export default Layout;
