import React, { useEffect, useState, useReducer } from "react";
import LoginPage from "./Pages/LoginPage";
import Context from "./Context/Context";
import Homepage from "./Pages/Homepage";
import Signup from "./Pages/Signup";
import Payment from "./Pages/Payment";
import MyKart from "./Pages/MyKart";
import Loading from "../src/components/Loading";
import { imageConfig } from "./utils/imageConfig";
import { commerce, datatype, lorem } from "faker";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Audio, Oval, Rings, TailSpin } from "react-loader-spinner";
import axios from "axios";
//FireBase

import { firebaseAuth, database, storage } from "../src/utils/FirebaseConfig";

//react-router

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Header
import Header from "./components/Header";
import UserSettingsPage from "./Pages/UserSettingsPage";

//app
const App = () => {
  //states-userIds
  const [photos, setPhotos] = useState([]);
  const [err, setErr] = useState([]);
  const [isUserLogged, SetIsUserlogged] = useState(false);
  const [uid, setUid] = useState();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isCheckoutDone, setIsCheckoutDone] = useState(false);
  const [itemQuantityList, setItemQuantityList] = useState([]);

  //observerTocheckIfUserIsLoggedIn

  const observe = () =>
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUid(toString(user.uid));
        fetchCreds(user.uid);
        SetIsUserlogged(true);
        setUser(user);
      } else {
        SetIsUserlogged(false);
      }
    });
  //funtion to fetch the database details from server

  const fetchCreds = (uid) => {
    const userRef = database.ref("user/" + uid);
    // console.log(userRef);
    userRef.on("value", (snapshot) => setUserData(snapshot.val()));
  };
  //useEffect -  to observe the authentication is done alreadty or not

  const Clothingurl = "http://myjson.dit.upm.es/api/bins/gywj";
  const GetObject = async () => {
    const data = await axios.get(Clothingurl);
    const dataPhotos = data.data.photos;

    // console.log("here", dataPhotos);

    const photoData = dataPhotos.map((singlePhoto) => ({
      id: datatype.uuid(),
      name: commerce.product(),
      price: commerce.price(),
      urlMedium: singlePhoto.src.medium,
      urlOriginal: singlePhoto.src.original,
      urlTiny: singlePhoto.src.tiny,
      urlSmall: singlePhoto.src.small,
      urlLandscape: singlePhoto.src.landscape,
      description: lorem.sentence(5, 30),
    }));
    setPhotos(photoData);
  };

  // console.log("is ", isCheckoutDone);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
    console.log("its happening");
    setLoadingProgress(100);
    observe();

    GetObject();
  }, []);
  return (
    <Context.Provider
      value={{
        photos: photos,
        setPhotos: setPhotos,
        observe: observe,
        LoginError: err,
        setError: setErr,
        isUserLogged: isUserLogged, //Values passed down the
        SetIsUserlogged: SetIsUserlogged,
        user: user,
        setUser: setUser,
        loading: loading,
        email: email,
        setEmail: setEmail,
        setName: setName,
        name: name,
        setLoadingProgress: setLoadingProgress,
        cartItems: cartItems,
        setCartItems: setCartItems,
        itemQuantityList: itemQuantityList,
        setItemQuantityList: setItemQuantityList,
        userData: userData,
        setUserData: setUserData,
        setUid: setUid,
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Rings color="#7b7c80" height={80} width={80} />
        </div>
      ) : (
        <div>
          <Router>
            <Header
              loadingProgress={loadingProgress}
              setLoadingProgress={setLoadingProgress}
            />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/"
                element={isUserLogged ? <Homepage /> : <LoginPage />}
              />
              <Route
                path="/usersettings"
                element={isUserLogged ? <UserSettingsPage /> : <LoginPage />}
              />
              <Route
                path="/mykart"
                element={<MyKart setIsCheckoutDone={setIsCheckoutDone} />}
              ></Route>
              <Route
                path="/payment"
                element={isCheckoutDone ? <Payment /> : <MyKart />}
              ></Route>
            </Routes>
          </Router>
        </div>
      )}
    </Context.Provider>
  );
};

export default App;
