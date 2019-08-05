import { Component } from '@angular/core';

interface ListElement {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todoList: ListElement[] = [];
  doneList: ListElement[] = [];
  next_id = 0;

  constructor() {}

  ngOnInit() {}

  addAndReset(input) {
    if (`${input.value}`.trim() === '') {
      return;
    }

    const newElement = { id: this.next_id, title: input.value, completed: false };
    this.next_id++;
    this.todoList.push(newElement);
    input.value = '';
  }

  check(item) {
    if (item.completed) {
      item.completed = false;
      this.todoList.push(item);

      for (let i = 0; i < this.doneList.length; i++) {
        if (this.doneList[i].id === item.id) {
          this.doneList.splice(i, 1);
        }
      }
    } else {
      item.completed = true;
      this.doneList.push(item);

      for (let i = 0; i < this.todoList.length; i++) {
        if (this.todoList[i].id === item.id) {
          this.todoList.splice(i, 1);
        }
      }
    }
  }

  remove(item) {
    if (item.completed) {
      for (let i = 0; i < this.doneList.length; i++) {
        if (this.doneList[i].id === item.id) {
          this.doneList.splice(i, 1);
        }
      }
    } else {
      for (let i = 0; i < this.todoList.length; i++) {
        if (this.todoList[i].id === item.id) {
          this.todoList.splice(i, 1);
        }
      }
    }
  }

  getElementById(id: number): ListElement {
    for (const element of this.todoList) {
      if (element.id === id) {
        return element;
      }
    }
    return null;
  }
}
