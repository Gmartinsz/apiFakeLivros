import { Router } from '@angular/router';
import { Livro } from './../../Livro';
import { LivroService } from './../../services/livro.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  isModal:boolean = false

  idLivroEX!:any
  livros!: Livro[]

  constructor(private service:LivroService, private router:Router) {

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


  editar(id:any){
    this.router.navigate(['/editar/' + id])
  }

  cancelarAcao(){
    this.isModal = false
  }

  confirmarAcao(){
    this.service.deleteBook(this.idLivroEX).subscribe({
      next: (res) => console.log(res),
      error: (e) => console.error(e),
      complete: () => {console.info('complete'); this.listarLivros(); this.isModal =false}
    }
    )

  }

  mostrarModal(id:any){
    this.isModal = true
    this.idLivroEX = id
  }

}
