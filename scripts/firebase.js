import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  query,
  where,
  getDocs,
  updateDoc,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgr0h2OSaw_ids2ZBC4AnqyF9sbK1Avyk",
  authDomain: "kuryentech.firebaseapp.com",
  projectId: "kuryentech",
  storageBucket: "kuryentech.firebasestorage.app",
  messagingSenderId: "582635932865",
  appId: "1:582635932865:web:264239eddf209f7de0d840",
  measurementId: "G-DWSWF4H2K4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function registerUser(email, name, username, password) {
  try {
    const docRef = doc(db, "users", username);
    await setDoc(docRef, {
      name: name,
      username: username,
      password: password,
      email: email,
      target_cost: 0,
      location: "",
    });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

async function addAppliance(
  username,
  appliance_name,
  KW_HR,
  HR_per_day,
  days_per_week
) {
  const userDocRef = doc(db, "users", username);

  const applianceDocRef = doc(
    collection(userDocRef, "appliances"),
    appliance_name
  );
  await setDoc(applianceDocRef, {
    name: appliance_name,
    KW_HR: KW_HR,
    HR_per_day,
    HR_per_day,
    days_per_week,
    days_per_week,
  });
}

async function addBill(username, date, total_kwH, total_cost) {
  const userDocRef = doc(db, "users", username);

  const billDocRef = doc(collection(userDocRef, "bills"), date);
  await setDoc(billDocRef, {
    date: date,
    total_kwH,
    total_kwH,
    total_cost,
    total_cost,
  });
}

async function test_firebase_add() {
  registerUser("cottonton@gmail.com", "ton", "tonton", "tontontont");
  addBill("tonton", "TestDate", 100, 5000);
  addAppliance("tonton", "laptop", 10, 3, 7);
}

async function AuthUser(username, password) {
  const q = query(
    collection(db, "users"),
    where("username", "==", username),
    where("password", "==", password)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });

  return querySnapshot.size != 0;
}

async function getUser(username) {
  const q = query(collection(db, "users"), where("username", "==", username));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });

  return querySnapshot;
}

async function getAppliancesOfUser(username) {
  const q = query(collection(doc(db, "users", username), "appliances"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });

  return querySnapshot;
}

async function getBillsOfUser(username) {
  const q = query(collection(doc(db, "users", username), "bills"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });

  return querySnapshot;
}

async function changeName(username, newName) {
  const docRef = doc(db, "users", username);
  await updateDoc(docRef, {
    name: newName,
  });
}

async function changeTargetCost(username, newTargetCost) {
  const docRef = doc(db, "users", username);
  await updateDoc(docRef, {
    target_cost: newTargetCost,
  });
}

async function changeLocation(username, newLocation) {
  const docRef = doc(db, "users", username);
  await updateDoc(docRef, {
    location: newLocation,
  });
}

export {
  registerUser,
  addAppliance,
  addBill,
  test_firebase_add,
  AuthUser,
  getAppliancesOfUser,
  getBillsOfUser,
  changeLocation,
  changeName,
  changeTargetCost,
  getUser,
};
