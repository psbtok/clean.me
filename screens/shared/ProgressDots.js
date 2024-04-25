import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

const ProgressDots = ({ numDots, activeDotIndex }) => {
  return (
    <View style={styles.container}>
      {[...Array(numDots).keys()].map((index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeDotIndex ? styles.activeDot : null,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.grey4,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: colors.confirmGreen,
  },
});

export default ProgressDots;
