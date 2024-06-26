import {Execution} from "@/model/Execution";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  updateDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import {Chrono} from "@/model/Chrono";
import {db} from "@/firebase/config";
import {Lap} from "@/model/Lap";
import {Location} from "@/model/Location";

const COLLECTION_NAME = "history";
const USER_ID_FIELD_NAME = "userId";

interface FirebaseExecution {
  id: string;
  date: Timestamp,
  laps: FirebaseLap[],
  location?: Location
}

interface FirebaseLap {
  id: string,
  position: number,
  timer: number,
  moment: Timestamp,
}

export const saveByUserId = async (
  userId: string,
  execution: Execution
): Promise<void> => {
  return await saveNetworkData(userId, execution);
};

export const getByUserId = async (userId: string) => {
  return (await getNetworkDataById(userId))?.executions ?? [];
};

export const clearByUserId = async (userId: string): Promise<void> => {
  return await clearNetworkData(userId)
};


const saveNetworkData = async (
  userId: string,
  execution: Execution
): Promise<void> => {
  const querySnapshot = await getReferenceNetworkDataById(userId);
  try {
    if (querySnapshot?.empty) {
      console.log("No matching document found");
      const collectionRef = collection(db, COLLECTION_NAME); 
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

const clearNetworkData = async (
  userId: string
): Promise<void> => {
  const querySnapshot = await getReferenceNetworkDataById(userId);
  try {
    if (querySnapshot?.empty) { //Non exists document
      console.log("No matching data found");
    } else {
      const docRef = querySnapshot.docs[0]?.ref;
      await updateDoc(docRef, {
        userId: userId,
        executions: [],
      });
      console.log(`UserId: ${userId} has been updated successfully`)
    }
  } catch (error) {
    console.error("Error clear data for document: ", error);
    throw Error();
  }
};

const getNetworkDataById = async (userId: string): Promise<Chrono> => {
  return (await getReferenceNetworkDataById(userId))?.docs.map(
    (doc): Chrono => {
      const data = doc.data();
      const executions: Execution[] = data?.executions?.map((exec: FirebaseExecution): Execution => {
        const laps: Lap[] = exec.laps?.map((lap: FirebaseLap): Lap => {
          return {
            id: lap.id,
            position: lap.position,
            timer: lap.timer,
            moment: new Timestamp(exec.date.seconds, exec.date.nanoseconds).toDate(),
          }
        }) ?? []

        return {
          id: exec.id,
          date: new Timestamp(exec.date.seconds, exec.date.nanoseconds).toDate(),
          laps: laps,
          location: exec.location

        }
      }) ?? []

      return {
        userId: data.userId,
        executions: executions,
      };
    }
  )[0];
};

const getReferenceNetworkDataById = async (userId: string) => {
  try {
    const collectionRef = collection(db, COLLECTION_NAME);
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


