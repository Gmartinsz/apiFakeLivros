import { CardsComponent } from './components/cards/cards.component';
import { LivroFormComponent } from './components/livro-form/livro-form.component';
import { ListaComponent } from './components/lista/lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component:ListaComponent},
  {path:'lista', component:ListaComponent},
  {path:'add', component:LivroFormComponent},
  {path:'editar/:id', component:LivroFormComponent},
  {path:'cards', component:CardsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
