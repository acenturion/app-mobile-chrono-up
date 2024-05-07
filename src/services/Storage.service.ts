import { Execution } from "@/model/Execution";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value: Execution) => {
    const jsonValue = JSON.stringify(value);
    AsyncStorage.setItem('executions', jsonValue)
    .then(_=>
      console.log("guardado exitosamente")
    );
  };

export const getData = async (): Promise<Execution[] | undefined> => {
    try {
      const jsonValue = await AsyncStorage.getItem('executions');
      return jsonValue != null ? JSON.parse(jsonValue) as Execution[] : undefined;
    } catch (e) {
      // error reading value
    }
};
