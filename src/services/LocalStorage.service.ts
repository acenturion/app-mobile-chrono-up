import { Execution } from "@/model/Execution";
import * as SecureStore from "expo-secure-store";
const EXECUTIONS_KEY = "executions";

const clearLocalData = async (): Promise<void> => {
    try {
      await SecureStore.setItemAsync(EXECUTIONS_KEY, JSON.stringify([]));
    } catch (error) {
      console.error("Error clear data: ", error);
      throw Error();
    }
  };
  
  
  const getLocalData = async (): Promise<Execution[]> => {
    try {
      const existingData = await SecureStore.getItem(EXECUTIONS_KEY); //TODO: Por userId
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