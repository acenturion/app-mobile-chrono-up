import React from 'react';
import Profile from "@/components/organism/Profile";
import {useUser} from "@/context/UserContext";
import TabLayout from "@/components/layouts/TabLayout";

function ProfileScreen() {
  const {user, logOut} = useUser();
  return (
    <TabLayout>
      <Profile
        user={user}
        onLogOut={logOut}
      />
    </TabLayout>
  );
}

export default ProfileScreen;