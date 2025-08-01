import Loader from "@/components/MainLoader/Loader";
import AccountForm from "@/components/Profile/AccountForm";
import Address from "@/components/Profile/Address";
import ChangePassword from "@/components/Profile/ChangePassword";
import useAxios from "@/customHook/fetch-hook";
import React, { useEffect } from "react";

const Profile = () => {
  const {
    data: userData,
    fetchData: getProfile,
    loading,
  } = useAxios({
    method: "GET",
    url: "/user/profile",
  });

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div className="max-mobile:py-[30px] max-md:py-[40px] max-lg:py-[50px] py-[70px]">
        {loading ? (
          <Loader />
        ) : (
          <div className="max-w-[1616px] px-10 max-lg:px-5 mx-auto">
            <AccountForm userData={userData} getProfile={getProfile} />
            <div className="max-mobile:py-[30px] max-md:py-[40px] max-lg:py-[50px] py-[70px]">
              <Address userData={userData} getProfile={getProfile} />
            </div>
            <ChangePassword />
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
