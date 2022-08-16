const container = document.querySelector('.todos');

export default class MyLib {
  constructor() {
    this.lists = [];
  }

    addList = (description) => {
      const myList = {
        description,
        completed: false,
        index: this.lists.length + 1,
      };
      this.lists.push(myList);
      this.saveMyLib();
    }

    setOrder = () => {
      let orderNum = 1;
      this.lists.forEach((list) => {
        list.index = orderNum;
        orderNum += 1;
      });
    }

    remove = (id) => {
      this.setOrder();
      this.lists.forEach((list) => {
        if (list.index === Number(id)) {
          this.lists
            .splice(list.index - 1, 1);
          this.setOrder();
        }
      });
    }

    removeComplete = () => {
      this.lists = this.lists.filter((list) => list.completed === false);
      this.saveMyLib();
    }

    html = (list) => `
        <div class="tasks">
            <div class="below" id=${list.index}>
                <input
                 type="checkbox" 
                 name="box" 
                 class="checkbox" ${list.completed ? 'checked' : ''}
                 id=${list.index}>
                <input 
                id="${list.index}" 
                class=${list.completed ? 'line list-label' : 'list-label'} 
                value="${list.description}"
                type="text">
            </div>
            <p class="removeList" id=${list.index}><i class="fa-solid fa-trash-can"></i></p> 
        </div>`;

    displayBooks = () => {
      this.getMyLib();
      container.innerHTML = '';
      this.lists
        .forEach((list) => container.insertAdjacentHTML('beforeend', this.html(list)));
      const checkboxes = document.querySelectorAll('.checkbox');
      const taskLabel = container.querySelectorAll('.list-label');
      checkboxes.forEach((checkbox, id) => {
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) {
            taskLabel[id]?.classList.add('line');
            this.lists = this.lists.map((list) => {
              if (list.index === parseInt(checkbox.parentElement.id, 10)) {
                list.completed = true;
              }
              return list;
            });
            this.saveMyLib();
          } else {
            taskLabel[id]?.classList.remove('line');
            this.lists = this.lists.map((list) => {
              if (list.index === parseInt(checkbox.parentElement.id, 10)) {
                list.completed = false;
              }
              return list;
            });
            this.saveMyLib();
          }
        });
      });

      const removeBtn = document.querySelectorAll('.removeList');
      removeBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const { id } = e.currentTarget;
          this.remove(id);
          this.saveMyLib();
          container.innerHTML = '';
          this.displayBooks(this.lists);
        });
      });

      taskLabel.forEach((textarea) => {
        textarea.addEventListener('change', () => {
          const result = this.lists.filter((list) => list.index === Number(textarea.id));
          this.lists[result[0].index - 1].description = textarea.value;
          this.saveMyLib();
        });
      });
    }

    saveMyLib = () => {
      const str = JSON.stringify(this.lists);
      localStorage.setItem('lists', str);
    };

    getMyLib = () => {
      if (localStorage.getItem('lists')) {
        this.lists = JSON.parse(localStorage.getItem('lists'));
      }
    };
}
