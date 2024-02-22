import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { scale, verticalScale } from "react-native-size-matters";
import { Spacer } from "../../components/Spacer";

const ArenaLayout = () => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          padding: scale(10),
        }}
      >
        <SkeletonPlaceholder>
          <View
            style={{ width: scale(50), height: scale(50), borderRadius: 100 }}
          />
        </SkeletonPlaceholder>
        <Spacer height={10} />

        <SkeletonPlaceholder>
          <View
            style={{
              width: scale(100),
              height: scale(12),
              borderRadius: 100,
              marginLeft: scale(7),
            }}
          />
          <View
            style={{
              width: scale(100),
              height: scale(12),
              borderRadius: 100,
              marginTop: 10,
              marginLeft: scale(7),
            }}
          />
        </SkeletonPlaceholder>
      </View>

      <SkeletonPlaceholder>
        <View style={{ width: "100%", height: verticalScale(250) }} />
      </SkeletonPlaceholder>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          padding: scale(10),
        }}
      >
        <SkeletonPlaceholder>
          <View
            style={{ width: scale(50), height: scale(50), borderRadius: 100 }}
          />
        </SkeletonPlaceholder>
        <Spacer height={10} />

        <SkeletonPlaceholder>
          <View
            style={{
              width: scale(100),
              height: scale(12),
              borderRadius: 100,
              marginLeft: scale(7),
            }}
          />
          <View
            style={{
              width: scale(100),
              height: scale(12),
              borderRadius: 100,
              marginTop: 10,
              marginLeft: scale(7),
            }}
          />
        </SkeletonPlaceholder>
      </View>

      <SkeletonPlaceholder>
        <View style={{ width: "100%", height: verticalScale(250) }} />
      </SkeletonPlaceholder>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          padding: scale(10),
        }}
      >
        <SkeletonPlaceholder>
          <View
            style={{ width: scale(50), height: scale(50), borderRadius: 100 }}
          />
        </SkeletonPlaceholder>
        <Spacer height={10} />

        <SkeletonPlaceholder>
          <View
            style={{
              width: scale(100),
              height: scale(12),
              borderRadius: 100,
              marginLeft: scale(7),
            }}
          />
          <View
            style={{
              width: scale(100),
              height: scale(12),
              borderRadius: 100,
              marginTop: 10,
              marginLeft: scale(7),
            }}
          />
        </SkeletonPlaceholder>
      </View>

      <SkeletonPlaceholder>
        <View style={{ width: "100%", height: verticalScale(250) }} />
      </SkeletonPlaceholder>
    </>
  );
};

export default ArenaLayout;

const styles = StyleSheet.create({});
