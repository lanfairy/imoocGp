
//
import React from 'react';
import {  StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { Button } from './ButtonWithMargin';
import SampleText from './SampleText';

const MyNavScreen = ({ navigation, banner }) => (
  <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
    <SampleText>{banner}</SampleText>
    <Button
      onPress={() => navigation.navigate('Polular')}
      title="Go to Polular tab"
    />
    <Button
      onPress={() => navigation.navigate('Mine')}
      title="Go to Mine tab"
    />
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
    <StatusBar barStyle="default" />
  </SafeAreaView>
);

export default MyNavScreen;
