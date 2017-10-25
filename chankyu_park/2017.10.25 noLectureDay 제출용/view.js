let todos;
const todoList = document.getElementById('todo-list');
const inputTodo = document.getElementById('input-todo');
let valueOfListId;

function render() {
  let html = '';
  todos.forEach(todo => {
    let checked = todo.completed ? false : '';

    html += `<li class="list-group-item">
            <div class="hover-anchor">
              <a class="hover-action text-muted">
                <span class="glyphicon glyphicon-remove-circle pull-right" data-id="${todo.id}"></span>
              </a>
              <label class="i-checks" for="${todo.id}">
                <input type="checkbox" id="${todo.id}" ${checked}><i></i>
                <span>${todo.content}</span>
              </label>
            </div>
          </li>`
  })
  todoList.innerHTML = html;
}



window.addEventListener('load', () => {
  todos = [
    { id: 3, content: '학교가기', completed: false },
    { id: 2, content: '밥먹기', completed: false },
    { id: 1, content: '일어나기', completed: true }
  ];

  render();

})

function getIdValue() {
  return todos ? Math.max.apply(null, todos.map(todo => todo.id)) + 1 : 1;
}

function addTodo() {
  if (inputTodo.value === '') return;
  let content = inputTodo.value;
  let todo = { id: getIdValue(), content: content, completed: false };
  console.log(todo.id);
  todos = [todo, ...todos];
  render();
  inputTodo.value = '';
}

function deleteTodo() {
  todos = todos.filter(todo => todo.id !== parseInt(valueOfListId));
  render();
}



function toggleIsCompleted(id) {
  todos.map(todo => todo.completed ? Object.assign({}, todo, { completed: !todo.completed }) : todo);
}


todoList.addEventListener('change', evnt => {
  toggleIsCompleted(evnt.target.id)
})


todoList.addEventListener('click', evnt => {
  if (evnt.target.nodeName !== 'SPAN' || evnt.target.parentNode.nodeName === 'LABEL') return;
  valueOfListId = evnt.target.dataset.id;
  deleteTodo();
})


inputTodo.addEventListener('keyup', evnt => {
  if (evnt.keyCode !== 13) return;
  addTodo();
})