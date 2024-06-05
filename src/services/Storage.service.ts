import { Execution } from "@/model/Execution";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = { //TODO: process.env
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

console.log(firebaseConfig)

const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);



export const storeData = async (value: Execution) => {
  // try {
  //   const existingData = await AsyncStorage.getItem('executions');
  //   let executions = [];

  //   if (existingData) {
  //     executions = JSON.parse(existingData);
  //   }
  //   executions.push(value);
  //   const jsonValue = JSON.stringify(executions);
  //   await AsyncStorage.setItem('executions', jsonValue);
  //   console.log("Guardado exitosamente");
  // } catch (error) {
  //   console.error("Error al guardar los datos:", error);
  // }

  try {
    const docRef = await addDoc(collection(firestore, "tests"), {
      //TODO: ESTO FUNCIONA
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getData = async (): Promise<Execution[] | undefined> => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "tests"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });

    const jsonValue = await AsyncStorage.getItem("executions");
    return jsonValue != null
      ? (JSON.parse(jsonValue) as Execution[])
      : undefined;
  } catch (e) {
    // error reading value
  }
};

export const clearData = () => {
  const jsonValue = JSON.stringify([]);
  AsyncStorage.setItem("executions", jsonValue);
};
