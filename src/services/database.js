import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config";
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