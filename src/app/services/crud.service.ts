import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  
  constructor(
    private http : HttpClient,
  ) { }

  todoUpdated = new EventEmitter<any>();

  //get updated data from json "db" after changes have been made
  updateTodos(){
    this.todoUpdated.emit(this.getTodo());
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
    return this.http.put<any>("http://localhost:3000/todoList/"+id, data)
  }

  //delete data from json "db"
  deleteTodo(id: number){
    return this.http.delete<any>("http://localhost:3000/todoList/"+id)
  }

}
