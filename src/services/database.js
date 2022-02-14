import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    collection,
    query,
    getDocs,
    addDoc,
    doc,
    deleteDoc,
    updateDoc
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3pf6trIUnJUqk4XwmdqW_gXRCDw8lj9s",
    authDomain: "todo-firestore-f3924.firebaseapp.com",
    projectId: "todo-firestore-f3924",
    storageBucket: "todo-firestore-f3924.appspot.com",
    messagingSenderId: "157722766943",
    appId: "1:157722766943:web:4e6a328f43c833d608f5ea",
    measurementId: "G-KC6LX7VHN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const addTodoDB = async (newTask) => {
    try {
        const docRef = await addDoc(collection(db, "todos"), {
            title: newTask.title,
            time: newTask.time,
            completed: false
        });
        return true;
    } catch (e) {
        return false;
    }
}

const getTodosDB = async () => {
    try {
        const q = query(collection(db, "todos"));
        const todos = await getDocs(q);
        const todoArray = [];
        todos.forEach((todo) => {
            todoArray.push({id: todo.id, ...todo.data()});
        });
        return todoArray;
    } catch (e) {
        return false;
    }
}

const deleteTodoDB = async (id) => {
    try {
        await deleteDoc(doc(db, "todos", id));
        return true;
    } catch (e) {
        return false;
    }
}

const editTodoDB = async (id,  completed, title, time) => {
    try {
        const docRef = doc(db, "todos", id);
        await updateDoc(docRef, {
            completed: completed,
            title: title,
            time: time
        })
        return true;
    } catch (e) {
        return false;
    }
}

export {
    addTodoDB,
    getTodosDB,
    deleteTodoDB,
    editTodoDB
}