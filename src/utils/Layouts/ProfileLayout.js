import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { scale, verticalScale } from "react-native-size-matters";
import { Spacer } from "../../components/Spacer";
import ArenaLayout from "./ArenaLayout";

const ProfileLayout = () => {
  return (
    <>
      <SkeletonPlaceholder>
        <View style={{ width: "100%", height: verticalScale(400) }} />
      </SkeletonPlaceholder>

      <ArenaLayout />
    </>
  );
};

export default ProfileLayout;
