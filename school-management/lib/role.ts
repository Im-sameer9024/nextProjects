import {  currentUser } from "@clerk/nextjs/server";

const getRoleForServerSide = async () => {
  const user = await currentUser();

  const role = (user?.publicMetadata?.role as string | null)
  const currentUserId = user?.id

  return {
    role,
    currentUserId

  };
};

export default getRoleForServerSide;
