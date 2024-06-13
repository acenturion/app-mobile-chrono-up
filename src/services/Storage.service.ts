import { Execution } from "@/model/Execution";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  limit,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import * as SecureStore from "expo-secure-store";
import { Chrono } from "@/model/Chrono";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

console.log(firebaseConfig);

const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);

const EXECUTIONS_KEY = "executions";

const COLLECTION_NAME = "history";
const USER_ID_FIELD_NAME = "userId";

export const saveByUserId = async (
  userId: string,
  execution: Execution
): Promise<void> => {
  return await saveNetworkData("12345000", execution);
};

export const getByUserId = async (userId: string) => {
  return (await getNetworkDataById("12345000"))?.executions ?? [];
};

export const clearData = async (): Promise<void> => {
  try {
    await SecureStore.setItemAsync(EXECUTIONS_KEY, JSON.stringify([]));
  } catch (error) {
    console.error("Error clear data: ", error);
    throw Error();
  }
};

const saveNetworkData = async (
  userId: string,
  execution: Execution
): Promise<void> => { //TODO: En realidad aca es agregarle la ejecucion a el usuario
  const querySnapshot = await getReferenceNetworkDataById(userId);
  try {
    if (querySnapshot?.empty) { //Non exists document
      console.log("No matching document found");
      const collectionRef = collection(firestore, COLLECTION_NAME); // Referencia a la colección
      await addDoc(collectionRef, {
        userId: userId,
        executions: [execution],
      }); 
      console.log(`UserId: ${userId} has been created successfully`)
    } else {
      const docRef = querySnapshot.docs[0]?.ref;
      const data = querySnapshot.docs[0]?.data();
      await updateDoc(docRef, {
        userId: userId,
        executions: [...(data?.executions ?? []), execution],
      });
      console.log(`UserId: ${userId} has been updated successfully`)
    }
  } catch (error) {
    console.error("Error adding or updating document: ", error);
    throw Error();
  }
};

const getNetworkDataById = async (userId: string): Promise<Chrono> => {
  return (await getReferenceNetworkDataById(userId))?.docs.map(
    (doc): Chrono => {
      const data = doc.data();
      return {
        userId: data.userId,
        executions: data.executions,
      };
    }
  )[0];
};

const getReferenceNetworkDataById = async (userId: string) => {
  try {
    const collectionRef = collection(firestore, COLLECTION_NAME);
    const qry = query(
      collectionRef,
      where(USER_ID_FIELD_NAME, "==", userId),
      limit(1)
    );
    return await getDocs(qry);
  } catch (error) {
    console.error("Error al obtener los datos del repositorio remoto", error);
    throw new Error();
  }
};

const getLocalData = async (): Promise<Execution[]> => {
  try {
    const existingData = await AsyncStorage.getItem(EXECUTIONS_KEY); //TODO: Por userId
    if (existingData) {
      return JSON.parse(existingData) as Execution[];
    }
    throw new Error(); //TODO: Ver que devolver
  } catch (error) {
    console.error("Error al obtener los datos del repositorio local:", error);
    throw new Error();
  }
};

const saveLocalData = async (execution: Execution): Promise<void> => {
  const executions: Execution[] = await getLocalData();
  try {
    executions.push(execution);
    await SecureStore.setItemAsync(EXECUTIONS_KEY, JSON.stringify(executions));
    console.log("Guardado exitosamente");
  } catch (error) {
    console.error("Error al guardar los datos del repositorio local:", error);
    throw new Error();
  }
};
