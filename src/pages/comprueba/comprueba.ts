import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { HomePage } from '../home/home';
import { BrowserProvider } from '../../providers/browser/browser';


@IonicPage()
@Component({
  selector: 'page-comprueba',
  templateUrl: 'comprueba.html',
})
export class CompruebaPage {

  homePage = HomePage;

  public sauna_id: number = this.navParams.get('sauna_id');
  noExiste: boolean;
  esCliente: boolean;
  saldo: any = 0;
  public tagId: string = this.navParams.get('tagId');
  analizado: boolean = false;


  constructor(public navCtrl: NavController, public browserProvider:BrowserProvider, public navParams: NavParams, public http: HttpClient) {

   	this.compruebaPulsera();

  }

  ionViewDidLoad() {
  }

  compruebaPulsera(){

    this.existePulsera(this.tagId);
    this.existeUsuario(this.tagId);          
    this.saldoUsuario(this.tagId);
    this.analizado = true;

    if((this.noExiste == false) && (this.esCliente == true)){
      //Es cliente. Mostramos eleccion de compra, recarga, etc
      //this.goCliente();
    } else if ((this.noExiste == false) && (this.esCliente == false)){ 
    	//Nuevo cliente. Mostramos botón para nuevo cliente
      //this.goNuevo();
    } else if (this.noExiste == true){
      //No existe la pulsera
    }
  }


  existePulsera(tag:string){
    let url = 'http://saunas.tellmetelecom.com/api/wristbandNoexist/'+tag;
    this.http.get(url).toPromise().then(data => {
    this.noExiste = data['status'];
    });
  }

  existeUsuario(tag:string){
    let url = 'http://saunas.tellmetelecom.com/api/userByWristband/'+tag;
    this.http.get(url).toPromise().then(data => {
    this.esCliente = data['status'];
    });
  }

  saldoUsuario(tag:string){
    let url = 'http://saunas.tellmetelecom.com/api/infoWristband/'+tag;
    this.http.get(url).toPromise().then(data => {
    let saldoTexto = data['amount'];
    this.saldo = parseFloat(saldoTexto);
    });
  }

  nuevoUsuario(){
    this.browserProvider.nuevoUsuario(this.tagId, this.sauna_id);
  }

  cargaDinero(){
    this.browserProvider.cargaDinero(this.tagId, this.sauna_id);
  }

  compraEntradas(){
    this.browserProvider.compraEntradas(this.tagId, this.sauna_id);
  }

  entraSauna(){
    this.browserProvider.entraSauna(this.tagId, this.sauna_id);
  }

  compraBebida(){
    this.browserProvider.compraBebida(this.tagId, this.sauna_id);
  }

  resetSauna(){
    this.browserProvider.resetSauna(this.tagId);
  }

  goInicio(){
    this.navCtrl.push(HomePage, {
        tagId: this.tagId,
        sauna_id: this.sauna_id
    });
  }

}

