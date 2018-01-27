import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>

        
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError} />

          <Button
            onPress={() => {
              AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
              AdMobRewarded.setTestDeviceID('EMULATOR');
              AdMobRewarded.requestAd(() => AdMobRewarded.showAd());
            }}
            title="Show AdMob Rewarded"
          />

          <Button
            onPress={() => {
              AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
              AdMobInterstitial.setTestDeviceID('EMULATOR');
              AdMobInterstitial.requestAd(() => AdMobInterstitial.showAd(() => Alert.alert('You tapped the button!')))
              
            }}
            title="Show AdMob Interstitial"
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
