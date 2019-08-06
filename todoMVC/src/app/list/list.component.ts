import { Component, OnInit } from '@angular/core';

enum Filter {
  ALL = 0,
  ACTIVE,
  COMPLETED,
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  todoList: ListElement[] = [];
  showList: ListElement[] = [];
  next_id = 0;
  currentFilter: Filter = Filter.ALL;
  nrOfActive = 0;
  setCompleted = true;

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
    this.filter(this.currentFilter);
    this.nrOfActive++;
  }

  check(item) {
    item.completed = !item.completed;
    this.nrOfActive = item.completed ? this.nrOfActive - 1 : this.nrOfActive + 1;
    this.filter(this.currentFilter);
  }

  remove(item) {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].id === item.id) {
        this.todoList.splice(i, 1);
      }
    }
    this.nrOfActive--;
    this.filter(this.currentFilter);
  }

  filter(filter: Filter) {
    this.currentFilter = filter;

    if (filter === Filter.ALL) {
      this.showList = this.todoList;
    } else {
      const showCompleted: boolean = filter === Filter.ACTIVE ? false : true;
      this.showList = [];
      for (const item of this.todoList) {
        if (item.completed === showCompleted) {
          this.showList.push(item);
        }
      }
    }
  }

  clearCompleted() {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].completed) {
        this.todoList.splice(i, 1);
        i--;
      }
    }
    this.filter(this.currentFilter);
  }

  checkAll() {
    if (this.nrOfActive === 0) {
      this.setCompleted = false;
    } else if (this.nrOfActive === this.todoList.length) {
      this.setCompleted = true;
    }

    for (const item of this.todoList) {
      if (item.completed != this.setCompleted) {
        item.completed = this.setCompleted;
        this.nrOfActive = this.setCompleted ? this.nrOfActive - 1 : this.nrOfActive + 1;
      }
    }
    this.setCompleted = !this.setCompleted;
    this.filter(this.currentFilter);
  }
}
