import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput, ScrollView, Clipboard } from 'react-native';
import { Button } from 'react-native-elements';
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
      greeting:""
      };
    this.baseState = this.state
    };
    getGreeting(){
      var phrases = [ "万事如意","恭喜发财","财源滚滚","一帆风顺", "岁岁平安", "财运亨通","五福临门"
                    , "福星高照","龙马精神","神采奕奕","步步高升", "四季平安", "合家欢乐","年年有余"
                    , "春风得意，大展鸿图","家兴，国兴，事事兴， 家圆，国圆，事事圆","恭祝您的事业蒸蒸日上,新年更有新气象"
                    ,"福气多多", "万福重叠福星高照", "新春如意","开春大吉","心想事成"
      ];
      for (var a=[],i=0;i<20;++i) a[i]=i;
      a = this.shuffle(a);
      var preGreeting;
      if(this.coundown() > 0){
        preGreeting = "在春节即将来临之际, ";
      }else{
        preGreeting = "在新春时节， ";
      }
      var greeting = preGreeting + this.state.senderName + "祝" + this.state.receviverName +","+ phrases[a[0]]+","+ phrases[a[1]] +","+ phrases[a[2]] +","+ phrases[a[3]] +","+ phrases[a[4]] +","+ phrases[a[5]]+ "！"
      this.setState({greeting});

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

    writeToClipboard = async () => {
      await Clipboard.setString(this.state.greeting);
      alert('复制成功!');
    };
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
                raised
                buttonStyle={styles.buttonStyle}
                icon={{name: 'cached'}}
                color="#841584"
                onPress={() => {
                  this.setState(this.baseState);
                  this.senderTextInput.clear();
                  this.receiverTextInput.clear();
                }}
                title="清空，再次制作新贺词" /> 
                : <Button
                  buttonStyle={styles.buttonStyle}
                  color="#841584"
                  onPress={() => {
                  AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
                  AdMobRewarded.setTestDeviceID('EMULATOR');
                  AdMobRewarded.requestAd(() => AdMobRewarded.showAd(() =>{this.setState({isAdOpen:true}); this.getGreeting();} ));
                  }}
                  title="获得专属贺词"
                  />
                }
             {this.state.isAdOpen ? <Text style={styles.textview} >{this.state.greeting}</Text> : null}
          </View>
          {this.state.isAdOpen ?
          <View>
            <Button onPress={()=>this.writeToClipboard()} title="复制"/>
          </View>
          : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#ce3b3b',
    
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
  },
  buttonStyle:{
    backgroundColor:'yellow'
    
  }
  });
