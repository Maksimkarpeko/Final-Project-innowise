"use client";

import { useParams} from "next/navigation";

export const UserProfilePage = () => {
  const params = useParams();
  const id = params.id;
  return <div>User Profile: {id}</div>;
};
