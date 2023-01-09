import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectedTodoComponent } from './selected-todo/selected-todo.component';

const routes: Routes = [
  { path: "todo/:id", component: SelectedTodoComponent, outlet: "selectedTodo" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
