import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  //onGetData: EventEmitter = new EventEmitter();
  
  constructor(
    private http : HttpClient,
  ) { }

  todoUpdated = new EventEmitter<any>();

  updateTodos(todos: any){
    this.todoUpdated.emit(todos);
  }

  //add data to json "db"
  postTodo(data: any){
    return this.http.post<any>("http://localhost:3000/todoList/", data)
  }

  //get data from json "db"
  getTodo(){
    return this.http.get<any>("http://localhost:3000/todoList/");
  }

  //update data to json "db"
  updateTodo(data: any, id: number){
    console.log(data.todoTitle + "in service update");
    this.todoUpdated.emit(data);
    return this.http.put<any>("http://localhost:3000/todoList/"+id, data)
  }

  //delete data from json "db"
  deleteTodo(id: number){
    return this.http.delete<any>("http://localhost:3000/todoList/"+id)
  }

}
