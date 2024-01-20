import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Slider from 'rn-range-slider';
import Label from './Label';
import Notch from './Notch';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Thumb from './Thumb';
const CustomSlider = ({onSliderChange}) => {
  const [selectedValue, setSelectedValue] = useState(0);

  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);

  const renderThumb = React.useCallback(name => <Thumb name={name} />, []);
  const renderRail = React.useCallback(() => <Rail />, []);
  const renderRailSelected = React.useCallback(() => <RailSelected />, []);
  const renderLabel = React.useCallback(value => <Label text={value} />, []);
  const renderNotch = React.useCallback(() => <Notch />, []);

  const [rangeDisabled, setRangeDisabled] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [floatingLabel, setFloatingLabel] = useState(false);

  const handleValueChange = (lowValue, highValue) => {
    setMin(lowValue);
    setMax(highValue);
  };
  return (
    <ScrollView>
      <View style={styles.root}>
        <Slider
          style={styles.slider}
          min={min}
          max={max}
          step={1}
          disableRange={rangeDisabled}
          floatingLabel={floatingLabel}
          onValueChanged={handleValueChange}
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
        />
        <View style={styles.horizontalContainer}>
          <Text style={styles.valueText}>{min}</Text>
          <Text style={styles.valueText}>{max}</Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: 'stretch',
    padding: 12,
    flex: 1,
    backgroundColor: '#555',
  },
  slider: {},
  button: {},
  header: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 12,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  valueText: {
    width: 50,
    color: 'white',
    fontSize: 20,
  },
});
export default CustomSlider;
