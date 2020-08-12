import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from './services/funcionario.service';
import { Funcionario } from './models/funcionario';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  config: any;
  funcionario = {} as Funcionario;
  funcionarios: Funcionario[];
  public paginaAtual = 1;
  
  constructor(private funcionarioService: FuncionarioService) {}
  
  ngOnInit() {
    this.getFuncionarios();
    
}
  
 
  pageChanged(event){
    this.config.currentPage = event;
  }	
  

  // defini se um funcionarioro será criado ou atualizado
  saveFuncionario(form: NgForm) {
    if (this.funcionario.id !== undefined) {
      this.funcionarioService.updateFuncionario(this.funcionario).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.funcionarioService.saveFuncionario(this.funcionario).subscribe(() => {
        this.cleanForm(form);
      });
    }

  }

  // Chama o serviço para obtém todos os funcionarioros
  getFuncionarios() {
    this.funcionarioService.getFuncionarios().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
    });
  }

  // deleta um funcionarioro
  deleteFuncionario(funcionario: Funcionario) {
    
  // uso SweetAlert botão excluir.
 
  swal.fire({
    title: 'Tem Certeza que deseja excluir esse dado?',
    text: 'Cuidado: essa ação não podera ser retornada',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, tenho certeza',
    cancelButtonText: 'Não! Eu quero desisteir de apagar'
  }).then((result) => {
    
    if (result.value) {
      this.funcionarioService.deleteFuncionario(funcionario).subscribe(() => {
        this.getFuncionarios()});
      swal.fire(
        'Arquivo apagado!',
        'O registro foi excluido com sucesso',
        'success'
      )
    }else if (result.dismiss === swal.DismissReason.cancel) {
      swal.fire(
        'Exclusão Cancelada',
        'O registro não foi excluido)',
        'error'
      )
    }
  }) 
}



  // copia o funcionarioro para ser editado.
  editFuncionario(funcionario: Funcionario) {
    // uso SweetAlert botão excluir.
    var switchText = document.getElementById("cancela");  
    var elToggled = document.getElementById("adicionar");  
    elToggled.style.display = "block";  
    switchText.addEventListener("click", function(){  
        if(elToggled.style.display == "block") {  
         
            elToggled.style.display = "none";  
        } else {  
            elToggled.style.display = "none";  
        }  
    }, false);  
    var switchText = document.getElementById("salva");  
    var elToggled = document.getElementById("adicionar");  
    elToggled.style.display = "block";  
    switchText.addEventListener("click", function(){  
        if(elToggled.style.display == "block") {  
         
            elToggled.style.display = "none";  
        } else {  
            elToggled.style.display = "none";  
        }  
    }, false);
    this.funcionario = { ...funcionario };
 
  swal.fire({
    title: 'Tem Certeza que deseja alterar esse dado?',
    text: 'Cuidado: essa ação poderá sobrepor o dado atual',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, tenho certeza',
    cancelButtonText: 'Não! Eu quero desisteir de alterar o dado'
  }).then((result) => {
    
    if (result.value) {
      this.funcionario = { ...funcionario };
      swal.fire(
        'Arquivo foi carregado para edição!',
        'O registro foi aberto para ser alterado',
        'success'
      )
    }else if (result.dismiss === swal.DismissReason.cancel) {
      swal.fire(
        'alteração Cancelada',
        'O registro não foi alterado)',
        'error'
      )
    }
  })
    
  }

// novo funcionarioro para ser editado.
  novoFuncionario(funcionario: Funcionario) {    
    
    var switchText = document.getElementById("adicionarbtn");  
    var elToggled = document.getElementById("adicionar");  
    elToggled.style.display = "block";  
    switchText.addEventListener("click", function(){  
        if(elToggled.style.display == "block") {  
         
            elToggled.style.display = "none";  
        } else {  
            elToggled.style.display = "block";  
        }  
    }, false);  
    var switchText = document.getElementById("salva");  
    var elToggled = document.getElementById("adicionar");  
    elToggled.style.display = "block";  
    switchText.addEventListener("click", function(){  
        if(elToggled.style.display == "block") {  
         
            elToggled.style.display = "none";  
        } else {  
            elToggled.style.display = "none";  
        }  
    }, false);  
    var switchText = document.getElementById("cancela");  
    var elToggled = document.getElementById("adicionar");  
    elToggled.style.display = "block";  
    switchText.addEventListener("click", function(){  
        if(elToggled.style.display == "block") {  
         
            elToggled.style.display = "none";  
        } else {  
            elToggled.style.display = "none";  
        }  
    }, false);  
    this.funcionario = { ...funcionario };
     }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getFuncionarios();
    form.resetForm();
    this.funcionario = {} as Funcionario;
  }


	
 
}