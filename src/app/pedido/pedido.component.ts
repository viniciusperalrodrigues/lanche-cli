import { Component, OnInit } from '@angular/core';
import { Http, Response, ResponseContentType } from '@angular/http'
import { AppComponent, url } from '../app.component';
import { Message } from 'primeng/primeng';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  constructor(private comp: AppComponent, private http: Http) { }

  lanches: any;
  lanchesPedido = [];
  pedido = {
    id: 1,
    lanches: [],
    total: 0
  };
  ingredientes: any;
  lancheSelecionado;
  totalPedidoCalc: number;
  totalPedido: any;
  visibleSideBar = false;
  promocaoVisible = false;
  idLanchesCustom = 6;
  msgs: Message[] = [];
  promocoesExibicao : any;

  ngOnInit() {

    this.totalPedidoCalc = 0.0;

    this.comp.loadUrls().subscribe(result => {
      this.getLanches();
      this.getIngredientes();

    });
  }




  getLanches() {
    this.http.get(url + "/lanche")
      .subscribe((res: Response) => {
        this.lanches = res.json();
        console.log(this.lanches);
      });
  }

  adicionarLanche() {
    if (this.lancheSelecionado != undefined && this.lancheSelecionado.nome != undefined) {
      console.log(this.lancheSelecionado);
      this.lanchesPedido.push(this.lancheSelecionado);
      this.totalPedidoCalc = (this.totalPedidoCalc + this.lancheSelecionado.valor);
      console.log(this.totalPedidoCalc);
      this.totalPedido = this.totalPedidoCalc.toFixed(2);
    } else {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Atenção', detail: 'Selecione um lanche.' });
    }
  };


  cancelarPedido() {
    this.totalPedido = 0;
    this.totalPedidoCalc = 0;
    this.lancheSelecionado = [];
    this.lanchesPedido = [];
    this.pedido.lanches = [];
  }

  getIngredientes() {
    this.http.get(url + "/ingrediente")
      .subscribe((res: Response) => {
        this.ingredientes = res.json();
        console.log(this.ingredientes);
      });
  }

  finalizarPedido() {

    this.pedido.lanches = this.lanchesPedido;

    console.log(this.lanchesPedido);
    console.log(JSON.stringify(this.lanchesPedido));
    this.http.post(url + "/pedido/save", this.pedido).subscribe((res: Response) => {
      let body = res.json();
      this.pedido = body;
      console.log(body);

      let promocoes = [];

      if (this.pedido.lanches != undefined) {
        this.pedido.lanches.forEach(lanche => {
          lanche.promocoes.forEach(promocao => {
            promocoes.push(promocao);
          });
        });
      }

      if (promocoes.length > 0){
        this.promocaoVisible = true;
        promocoes.push("Você economizou R$: " + (this.totalPedidoCalc - this.pedido.total).toFixed(2));
        this.promocoesExibicao = promocoes;          
      }else{
        this.cancelarPedido();
      }
      
    }, err => {
      console.log(err);
    });
  }

  montarLanche() {
    this.getIngredientes();
    this.visibleSideBar = true;
  }

  novoPedido(){
    this.promocaoVisible = false;
    this.cancelarPedido();
  }

  processarLancheCustom() {
    this.visibleSideBar = false;
    this.idLanchesCustom = this.idLanchesCustom + 1;


    let totalIng: number;

    let descricao = "";
    totalIng = 0.0;

    let ingredientesLancheCustom = [];

    this.ingredientes.forEach(ing => {

      if (ing.quantidade > 0) {
        totalIng = totalIng + (ing.quantidade * ing.preco)
        descricao += "- QTD: " + ing.quantidade + " " + ing.nome + ";"
        ingredientesLancheCustom.push(ing);
      }

    });

    console.log(totalIng);
    let lanche = {
      nome: "Customizado " + this.idLanchesCustom + " " + descricao,
      id: this.idLanchesCustom,
      valor: totalIng,
      ingredientes: ingredientesLancheCustom
    };

    if (totalIng > 0) {
      this.lanchesPedido.push(lanche);
      this.totalPedidoCalc += lanche.valor;
      this.totalPedido = this.totalPedidoCalc.toFixed(2);
    }
  }
}
