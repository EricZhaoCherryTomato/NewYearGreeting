import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, ScrollView } from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isAdOpen: false,
      senderName: "hey",
      receviverName: "hello",
      geetings:"新春快乐，万事如意"
      }
    }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.textview}>
            <TextInput
              style={styles.text}
              onChangeText={(senderName) => this.setState({senderName})}
              value={this.state.senderName}
            />
          </View>
          <View style={styles.textview}>
            <TextInput
              style={styles.text}
              onChangeText={(receviverName) => this.setState({receviverName})}
              value={this.state.receviverName}
            />
          </View>
          <View>
            <Button
              onPress={() => {
                AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
                AdMobRewarded.setTestDeviceID('EMULATOR');
                AdMobRewarded.requestAd(() => AdMobRewarded.showAd(() => this.setState({isAdOpen:true})));
              }}
              title="获得专属贺词"
            />
             {this.state.isAdOpen ? <Text>{this.state.senderName + this.state.receviverName}</Text> : null}
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#FAFAFA',
    
  },
  textview:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  text:{
    width:300
  }
  });
