import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import {colors} from './Colors';

const Loader = ({loading, file, height}) => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}>
      <LottieView
        style={{height: height || 150}}
        source={file}
        autoPlay
        speed={1}
      />
    </View>
  );
};

export default Loader;
