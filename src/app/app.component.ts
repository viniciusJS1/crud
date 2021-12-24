import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, pluck, tap } from 'rxjs'

interface PokeApi {
  count: number
  next: string
  previous: string
  results: [{}]
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crud'
  digitado = ''
  listaDeCompras = [
    {
      img: '',
      nome: 'leite',
    },
    {
      img: '',
      nome: 'carne',
    },
    {
      img: '',
      nome: 'ovo',
    },
    {
      img: '',
      nome: 'açucar',
    },
  ]
  nomeBotao = 'adicionar'
  indexAtual = -1
  pokeApi$ = new Observable<[any]>()

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.pokeApi$ = this.http
      .get<PokeApi>('https://pokeapi.co/api/v2/pokemon?limit=100&offset=200')
      .pipe(pluck('results'), tap(console.log))
  }

  adicionar() {
    if (this.digitado.length) {
      this.listaDeCompras.push({
        img: '',
        nome: this.digitado,
      })
      this.digitado = ''
    }
  }

  deletar(index: number) {
    const itemDeletado = this.listaDeCompras[index]
    this.listaDeCompras = this.listaDeCompras.filter((_, i) => i !== index)
    this.indexAtual = -1
  }

  editando(item: string, i: number) {
    this.digitado = item
    this.nomeBotao = 'editar'
    this.indexAtual = i
    console.log(this.indexAtual)
  }

  editar() {
    console.log(this.listaDeCompras[this.indexAtual])
    this.listaDeCompras[this.indexAtual].nome = this.digitado
    this.nomeBotao = 'adicionar'
    this.digitado = ''
    this.indexAtual = -1
  }

  escolherAcao() {
    if (this.nomeBotao === 'adicionar') this.adicionar()
    else this.editar()
  }
}
