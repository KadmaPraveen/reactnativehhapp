import React from 'react';
import { View, Text, Button, Alert } from 'react-native';

const Counter = (props) => {
  console.log('counter Props', props);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Button
        title={'-'}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: 'orange',
        }}
        onPress={()=>Alert.alert("HI")}
      />
      <Text>{props.value}</Text>
      <Button
        title={'+'}
        style={{
          paddingHorizontal: 20,
          backgroundColor: 'green',
          paddingVertical: 10,
        }}
        onPress={()=>props.onIncrement}
      />
    </View>
  );
};

export default Counter;
