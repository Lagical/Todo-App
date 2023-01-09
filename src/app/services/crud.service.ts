import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todo {  
  todoTitle: string;
  todoText: string;
  id: number;
  done: boolean;
}  

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  todos: Todo[] = [];

  constructor(
    private http : HttpClient
  ) { }

  postTodo(data : any){
    return this.http.post<any>("http://localhost:3000/todoList/", data)
  }

  getTodo(){
    return this.http.get<any>("http://localhost:3000/todoList/");
  }
}
