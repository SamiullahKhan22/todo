const firebaseConfig = {
    apiKey: "AIzaSyAGfRHxsXuUHqPfOCj7yI_f7ol8piWTEQc",
    authDomain: "todo-app-3fb42.firebaseapp.com",
    projectId: "todo-app-3fb42",
    storageBucket: "todo-app-3fb42.appspot.com",
    messagingSenderId: "394023928963",
    appId: "1:394023928963:web:e275f9a353be9337e147b6",
    measurementId: "G-GQG6Y8VP8L"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

var list = document.getElementById("list");

firebase.database().ref("todos").on("child_added", function (data) {

    // create li tag woth text node

    var li = document.createElement("li");
    var liText = document.createTextNode(data.val().value);
    li.appendChild(liText);

    // creat delete button

    var dltBtn = document.createElement("button");
    var delText = document.createTextNode("DELETE")
    dltBtn.setAttribute("class", "btn");
    dltBtn.setAttribute('id', data.val().key);
    dltBtn.setAttribute("onclick", "dltItem(this)");
    dltBtn.appendChild(delText);

    // creat edit button

    var editBtn = document.createElement("button");
    var editText = document.createTextNode("EDIT");
    editBtn.setAttribute("class", "btn");
    editBtn.setAttribute('id', data.val().key);
    editBtn.setAttribute("onclick", "editItem(this)")
    editBtn.appendChild(editText);

    li.appendChild(dltBtn)
    li.appendChild(editBtn)

    list.appendChild(li)
})


function add() {
    var todo_item = document.getElementById("todo-item");
    var database = firebase.database().ref("todos")
    var key = database.push().key;
    var todo = {
        value: todo_item.value,
        key: key
    }
    database.child(key).set(todo)
    todo_item.value = "";
}

function dltItem(e) {
    e.parentNode.remove()
}

function editItem(e) {
    console.log(e.id)
    var val = prompt("Enter update value", e.parentNode.firstChild.nodeValue);
    var editTodo = {
        value: val,
        key: e.id
    }
    firebase.database().ref("todos").child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue = val;
}

function dltAll() {
    list.innerHTML = ""
}