import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState, } from 'react'

import { AntDesign, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import Constants from "expo-constants";

import { useNavigation } from '@react-navigation/native';

import { auth, setDoc, db, doc } from "../../firebase";
import { getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const Profile = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const [userName, setUserName] = useState("");

  const getUser = async () => {
    if (user) {
      const myUserUid = auth.currentUser.uid;
      const docRef = doc(db, "users", `${myUserUid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const userData = docSnap.data();
        const name = userData.name;
        setUserName(name);

      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } else {
      alert("Không có tài khoản!");
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        //navigation.replace('DangNhap');
      })
      .catch(error => alert(error.message));
  }

  return (
    <SafeAreaView style={style.container}>
      <Image source={require('../assets/Background1.png')} style={style.background1} />
      <Image source={require('../assets/Background2.png')} style={style.background2} />
      <View style={{ height: 80, flexDirection: 'row' }}>
        <View style={{ flex: 2 }}>
          <FontAwesome name="user-circle-o" size={80} color="white" style={{
            left: 20,
          }} />
        </View>
        <View style={{ flex: 4, justifyContent: "space-between" }}>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", marginTop: 20, }}>{userName}</Text>
          <View style={{ flexDirection: 'row' }}>
            <MaterialIcons name="edit" size={15} color="white" > </MaterialIcons>
            <TouchableOpacity onPress={() => navigation.navigate('Information')}>
              <Text style={{ color: "#fff" }}>Chỉnh sửa thông tin cá nhân</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 21, height: 700 }}>

        <View style={style.content}>
          <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={() => navigation.navigate('ChangePW')} >
            <Entypo name="lock" size={15} color="#EA5C2B" style={style.icon1} />
            <Text style={style.text}>Đổi mật khẩu</Text>
            <AntDesign name="right" size={12} color="black" style={style.icon2} />
          </TouchableOpacity>
          <View style={{ width: '100%', borderWidth: 0.75, borderColor: "#B9B9B9" }}></View>
        </View>
        <View style={style.content}>
          <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={() => navigation.navigate('OrderTracking')}>
            <FontAwesome
              name="shopping-bag"
              size={15} color="#EA5C2B"
              style={style.icon1} />
            <Text style={style.text}>Đơn hàng</Text>
            <AntDesign name="right" size={12} color="black" style={style.icon2} />
          </TouchableOpacity>
          <View style={{ width: '100%', borderWidth: 0.75, borderColor: "#B9B9B9" }}></View>
        </View>

        <View style={style.content}>
          <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={() => navigation.navigate('Thông báo')}>
            <MaterialIcons name="notifications" size={15} color="#EA5C2B" style={style.icon1} />
            <Text style={style.text}>Thông báo</Text>
            <AntDesign name="right" size={12} color="black" style={style.icon2} />
          </TouchableOpacity>
          <View style={{ width: '100%', borderWidth: 0.75, borderColor: "#B9B9B9" }}></View>
        </View>
        <View style={style.content}>
          <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={handleSignOut} >
            <MaterialIcons name="logout" size={15} color="#EA5C2B" style={style.icon1} />
            <Text style={style.text}>Đăng xuất</Text>
            <AntDesign name="right" size={12} color="black" style={style.icon2} />
          </TouchableOpacity>
          <View style={{ width: '100%', borderWidth: 0.75, borderColor: "#B9B9B9" }}></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Profile;

const style = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
  background1: {
    position: 'absolute',
    width: '100%',
    height: 450,
  },
  background2: {
    position: 'absolute',
    top: 125,
    width: '100%',
    height: 700,
  },
  content: {
    height: 40,
    paddingTop: 10,
  },
  icon1: {
    flex: 1,
    marginLeft: 10,
  },
  icon2: {
    flex: 1,
  },
  text: {
    fontSize: 12,
    flex: 9
  },
});