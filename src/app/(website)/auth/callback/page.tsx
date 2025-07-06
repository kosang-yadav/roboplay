import { authenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

const authCallbackPage = async () => {
  const user = await authenticateUser();

  if (user.status === 200 || user.status === 201)
    redirect(
      `/dashboard/${
        !user?.user?.fullname?.includes("null")
          ? user.user?.fullname.replace(" ", "-") + "'s-WorkSpace"
          : user.user?.email.split("@")[0] + "'s-WorkSpace"
      }`,
    );
  else if (user.status === 400 || user.status === 500 || user.status === 404)
    redirect("/auth/sign-in");
};

export default authCallbackPage;
