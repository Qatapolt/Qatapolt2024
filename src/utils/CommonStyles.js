import {
  scale,
  ScaledSheet,
  verticalScale,
  moderateScale,
} from "react-native-size-matters";
import { Platform, View } from "react-native";
import styled from "react-native-styled-components";
import { colors } from "./colors";

const commonStyles = ScaledSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
    flex: 1,
  },

  rowMain: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  img: {
    width: "100%",
    height: "100%",
  },

  containerCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  main: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

export const PH10 = styled(View, {
  paddingHorizontal: scale(10),
});
export const PH20 = styled(View, {
  paddingHorizontal: scale(20),
});

export default commonStyles;
