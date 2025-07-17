import AccountForm from "@/components/Profile/AccountForm";
import ChangePassword from "@/components/Profile/ChangePassword";
import React from "react";

const Profile = () => {
  return (
    <>
      <div className="py-[70px]">
        <div className="max-w-[1576px] px-10 mx-auto">
          <AccountForm />
          <div className="my-[70px]">
            <ChangePassword />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
