import { v4 as uuidv4 } from 'uuid';

const form = document.querySelector<HTMLFormElement>('.new-task-form');
const title = document.querySelector<HTMLInputElement>('.new-task-title');
const list = document.querySelector<HTMLUListElement>('.list');
let tasks: newTaskT[] = loadList();

type newTaskT = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

tasks.forEach(addNewTask);

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (title?.value == '' || title?.value == null) return;

  const task: newTaskT = {
    id: uuidv4(),
    title: title.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(task);

  saveList();

  addNewTask(task);
  title.value = '';
});

function addNewTask(value: newTaskT): void {
  const li = document.createElement('li');
  const container = document.createElement('div');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const close = document.createElement('span');

  checkbox.type = 'checkbox';
  checkbox.checked = value.completed;
  close.classList.add('close');

  checkbox.addEventListener('change', () => {
    value.completed = checkbox.checked;
    saveList();
  });
  close.addEventListener('click', () => removeTask(li, value.id));

  close.innerHTML = '&#10006;';

  label.append(checkbox, value.title);
  container.append(label, close);
  li.append(container);
  list?.append(li);
}

function saveList() {
  localStorage.setItem('myTasks', JSON.stringify(tasks));
}

function loadList(): newTaskT[] {
  const taskJson = localStorage.getItem('myTasks');

  if (taskJson == null) return [];
  return JSON.parse(taskJson);
}

function removeTask(li: HTMLUListElement, id: string): void {
  li.remove();
  tasks = tasks.filter((item) => item.id != id);
  saveList();
}
