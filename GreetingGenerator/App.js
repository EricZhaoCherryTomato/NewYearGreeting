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
      senderName: "输入寄信人名字",
      receviverName: "输入收信人名字",
      };
    this.baseState = this.state
    };
    getGreeting(){
      var phrases = ["万事如意","恭喜发财","财源滚滚","一帆风顺", "岁岁平安"];
      for (var a=[],i=0;i<4;++i) a[i]=i;
      a = this.shuffle(a);
      return this.state.senderName + "祝" + this.state.receviverName + phrases[a[0]] + phrases[a[1]] + phrases[a[2]]
    };

    coundown(){
      var countDownDate = new Date("Feb 15, 2018 15:37:25").getTime();
       // Get todays date and time
      var now = new Date().getTime();
      
      // Find the distance between now an the count down date
      var distance = countDownDate - now;
      
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      return days;
    }

    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    shuffle(array) {
      var tmp, current, top = array.length;
      if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
      return array;
    }
  render() {
    return (
      <ScrollView style={styles.container}>
      <View style={styles.textview}>
      <Text>
      {this.coundown()> 0 ? ("距离大年夜还有" + " " + this.coundown() +" 天") : ("大年夜已经过去" + " " + this.coundown() +" 天")}
      </Text>
      </View>
        <View style={styles.textview}>
            <TextInput
              style={styles.text}
              onChangeText={(senderName) => this.setState({senderName})}
              placeholder={this.state.senderName}
              ref={input => { this.senderTextInput = input }}
            />
          </View>
          <View style={styles.textview}>
            <TextInput
              style={styles.text}
              onChangeText={(receviverName) => this.setState({receviverName})}
              placeholder={this.state.receviverName}
              ref={input => { this.receiverTextInput = input }}
            />
          </View>
          <View>
              {this.state.isAdOpen ? <Button
                onPress={() => {
                  this.setState(this.baseState);
                  this.senderTextInput.clear();
                  this.receiverTextInput.clear();
                }}
                title="Reset" /> 
                : <Button
                  onPress={() => {
                  AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
                  AdMobRewarded.setTestDeviceID('EMULATOR');
                  AdMobRewarded.requestAd(() => AdMobRewarded.showAd(() => this.setState({isAdOpen:true})));
                  }}
                  title="获得专属贺词"
                  />
                }
             {this.state.isAdOpen ? <Text style={styles.textview} >{this.getGreeting()}</Text> : null}
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
