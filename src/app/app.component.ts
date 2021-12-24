import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crud';
  digitado = '';
  listaDeCompras = ['leite', 'carne', 'ovo', 'açucar'];
  nomeBotao = 'adicionar';
  indexAtual = -1;

  ngOnInit(): void {
    console.log(this.listaDeCompras);
  }
  adicionar() {
    console.log(this.digitado);
    this.listaDeCompras.push(this.digitado);
    this.digitado = '';
  }
  deletar(index: number) {
    console.log(index);
    this.listaDeCompras = this.listaDeCompras.filter((item, i) => i !== index);
    setTimeout(() => {
      alert('voce deletou um item');
    }, 300);
    this.indexAtual = -1;
  }
  editando(item: string, i: number) {
    console.log(item);
    this.digitado = item;
    this.nomeBotao = 'editar';
    this.indexAtual = i;
    console.log(this.indexAtual);
  }
  editar() {
    console.log(this.listaDeCompras[this.indexAtual]);
    this.listaDeCompras[this.indexAtual] = this.digitado;
    this.nomeBotao = 'adicionar';
    this.digitado = '';
    this.indexAtual = -1;
  }
  escolherAcao() {
    if (this.nomeBotao === 'adicionar') this.adicionar();
    else this.editar();
  }
}
