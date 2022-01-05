import { LivroService } from './../../services/livro.service';
import { Livro } from './../../Livro';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  livros!: Livro[]

  constructor(private service:LivroService) {

  }

  ngOnInit(): void {
    this.listarLivros()
  }



  listarLivros(){
    this.service.listar().subscribe(res =>{
      console.log(res)
      this.livros = res
    })
  }

  // listar(){
  //   this.service.listar().subscribe({
  //     next:(resultado)=>{this.livros =resultado.results
  //                         console.log(this.livros)},
  //     error: (erro) =>console.error(erro),
  //     complete: () => console.info('completou')
  //   })
  // }

}
