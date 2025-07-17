import AccountForm from "@/components/Profile/AccountForm";
import Address from "@/components/Profile/Address";
import ChangePassword from "@/components/Profile/ChangePassword";
import useAxios from "@/customHook/fetch-hook";
import React, { useEffect } from "react";

const Profile = () => {
  const { data: userData, fetchData: getProfile } = useAxios({
    method: "GET",
    url: "/user/profile",
  });

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div className="py-[70px]">
        <div className="max-w-[1576px] px-10 mx-auto">
          <AccountForm userData={userData} getProfile={getProfile} />
          <div className="my-[70px]">
            <Address userData={userData} getProfile={getProfile} />
          </div>
          <ChangePassword />
        </div>
      </div>
    </>
  );
};

export default Profile;
