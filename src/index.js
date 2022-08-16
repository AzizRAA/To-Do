import './style.css';
import MyLib from './modules/script.js';

const form = document.querySelector('form');
const container = document.querySelector('.todos');
const entered = document.querySelector('.fa-left-long');
const taskInput = document.querySelector('.listing');
const removeAll = document.querySelector('.remove');

const bookList = new MyLib();
bookList.displayBooks();

const approve = () => {
  if (taskInput.value.trim()) {
    bookList.addList(taskInput.value);
    container.innerHTML = '';
    taskInput.value = '';
    bookList.displayBooks();
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  approve();
});

entered.addEventListener('click', (e) => {
  e.preventDefault();
  approve();
});

removeAll.addEventListener('click', () => {
  bookList.removeComplete();
  bookList.displayBooks();
});
