import {Execution} from "@/model/Execution";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value: Execution) => {
  try {
    const existingData = await AsyncStorage.getItem('executions');
    let executions = [];

    if (existingData) {
      executions = JSON.parse(existingData);
    }
    executions.push(value);
    const jsonValue = JSON.stringify(executions);
    await AsyncStorage.setItem('executions', jsonValue);
    console.log("Guardado exitosamente");
  } catch (error) {
    console.error("Error al guardar los datos:", error);
  }
};

export const getData = async (): Promise<Execution[] | undefined> => {
  try {
    const jsonValue = await AsyncStorage.getItem('executions');
    return jsonValue != null ? JSON.parse(jsonValue) as Execution[] : undefined;
  } catch (e) {
    // error reading value
  }
};

export const clearData = () => {
  const jsonValue = JSON.stringify([]);
  AsyncStorage.setItem('executions', jsonValue)
};
