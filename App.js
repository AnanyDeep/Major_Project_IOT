import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity, Text } from "react-native";
import firebase from "firebase";
import Firebase from "./screens/Firebase";

export default function App() {
  const [status, setStatus] = useState();
  const [btn, setBtn] = useState(false);

  const [temp, setTemp] = useState([]);

  useEffect(() => {
    mins();
    const myitems = firebase.database().ref("Connectivity");
    myitems.on("value", (snapshot) => {
      setStatus(Object.values(snapshot.val()));
      // setHum(status[0]);
      // setTemp(Object.values(datasnap.val()));
      console.log(Object.values(snapshot.val()));
      // console.log(status);
    });
  }, []);

  const Check = () => {
    mins();
    if (status == 0) {
      alert("Not Connected");
    } else {
      alert("Connected");
      setBtn(false);
    }
  };
  const off = () => {
    firebase.database().ref().update({
      Connectivity: 0,
    });
    setBtn(true);
  };

  const plus = () => {
    firebase.database().ref().update({
      LED_STATUS: 1,
    });
  };

  const minus = () => {
    firebase.database().ref().update({
      LED_STATUS: 0,
    });
  };

  const mins = () => {
    firebase.database().ref().update({
      Connectivity: 0,
    });
  };

  return (
    <View style={styles.container}>
      <Text>{temp}</Text>
      <View style={styles.btn}>
        <TouchableOpacity onPress={() => plus()} disabled={btn}>
          <Text style={styles.txt}>HIGH</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity onPress={() => minus()} disabled={btn}>
          <Text style={styles.txt}>LOW</Text>
        </TouchableOpacity>
      </View>
      <Button title="Show Status" onPress={() => Check()} />
      <Button title="Turn Off" onPress={() => off()} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "powderblue",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    marginTop: 50,
  },
  txt: {
    fontSize: 50,
    backgroundColor: "orange",
    paddingHorizontal: 100,
    borderRadius: 50,
    color: "#FFF",
  },
});
