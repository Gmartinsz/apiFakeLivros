import { LivroService } from './../../services/livro.service';
import { Livro } from './../../Livro';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-livro-form',
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.css']
})
export class LivroFormComponent implements OnInit {

  form!:FormGroup

  isModal:boolean = false

  verificaStatus:boolean = true

  livro:any
  constructor(private fb:FormBuilder, private service:LivroService, private router:Router, private route:ActivatedRoute) {

   }

  ngOnInit(): void {
    this.form = this.fb.group({
      id:[null],
      nome: [null],
      autor: [null],
      foto: [null]
    })
    const id_livro = <any>this.route.snapshot.params['id']
    console.log('id_entrada:' + id_livro)
    this.service.getUmLivro(id_livro).subscribe({
      next:(res)=>{console.log(res);this.livro = res;this.updateForm(this.livro);this.verificaStatus = false},
      error:(e)=>console.error(e),
      complete:()=>console.info('Tarefa encontrada')
    })
  }

  salvarLivro(){
    console.log(this.form.value)
    if(this.form.value.id){
      this.service.editLivro(this.form.value.id, this.form.value).subscribe({
        next:(res)=>console.log('Livro editado'),
        error:(e)=> console.error(e),
        complete:()=>{console.info('Edição completa')
        this.router.navigate(['/lista'])}
      })
    }else{
      this.service.addLivro(this.form.value).subscribe({
        next:(res)=> console.log('Livro Cadastrado com sucesso'),
        error: (e) => console.error(e),
        complete:() => {console.info('Cadastro completado'); this.router.navigate(['/lista'])}
      })
    }
  }

  updateForm(livro:any){
    this.form.patchValue({
      id:livro.id,
      nome:livro.nome,
      autor:livro.autor,
      foto:livro.foto
    })
  }

  cancelarAcao(){
    this.isModal = false
  }

  mostrarModal(){
    this.isModal = true
  }


}
