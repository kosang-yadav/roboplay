import { authenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

const dashboardPage = async () => {
  const user = await authenticateUser();

  console.log(user);

  if (user.status === 200 || user.status === 201) {
    // console.log("redirecting to dashboard...");
    redirect(
      `/dashboard/${
        !user?.user?.fullname?.includes("null")
          ? user.user?.fullname.replace(" ", "-") + "'s-WorkSpace"
          : user.user?.email.split("@")[0] + "'s-WorkSpace"
      }`,
    );
  } else if (
    user.status === 400 ||
    user.status === 500 ||
    user.status === 404
  ) {
    // console.log("redirecting to auth/sign-in...");
    redirect(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/auth/sign-in");
  }
};

export default dashboardPage;
