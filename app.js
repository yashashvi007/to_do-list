const container = document.querySelector('.container');
let inputValue = document.querySelector('.input');
const add = document.querySelector('.add');

if(window.localStorage.getItem("todos") == undefined){
     let todos = [];
     window.localStorage.setItem("todos", JSON.stringify(todos));
}

let todosEX = window.localStorage.getItem("todos");
let todos = JSON.parse(todosEX);


class item{
	constructor(name){
		this.createItem(name);
	}
    createItem(name){
    	let itemBox = document.createElement('div');
        itemBox.classList.add('item');

    	let input = document.createElement('input');
    	input.type = "text";
    	input.disabled = true;
    	input.value = name;
    	input.classList.add('item_input');

    	let edit = document.createElement('button');
    	edit.classList.add('edit');
    	edit.innerHTML = "EDIT";
    	edit.addEventListener('click', () => this.edit(input, name , edit));

    	let remove = document.createElement('button');
    	remove.classList.add('remove');
    	remove.innerHTML = "REMOVE";
    	remove.addEventListener('click', () => this.remove(itemBox, name));

    	container.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(edit);
        itemBox.appendChild(remove);

    }

    edit(input, name , edit){
        if(input.disabled == true){
           input.disabled = !input.disabled;
           edit.innerHTML = "SAVE"
        }
    	else{
            input.disabled = !input.disabled;
            edit.innerHTML = "EDIT"
            let indexof = todos.indexOf(name);
            todos[indexof] = input.value;
            window.localStorage.setItem("todos", JSON.stringify(todos));
        }
    }

    remove(itemBox, name){
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }
}

add.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
	if(e.key === "Enter"){
		check();
	}
})

function check(){
    const  exists = todos.find(el => el === inputValue.value)
    if(exists){
        alert("Item already Exists")
        return 
    }
	if(inputValue.value !== "" ){
		new item(inputValue.value);
        todos.push(inputValue.value);
        window.localStorage.setItem("todos", JSON.stringify(todos));
		inputValue.value = "";
	}
}


for (let v = 0 ; v < todos.length ; v++){
    new item(todos[v]);
}