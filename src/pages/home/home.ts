import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NFC } from "@ionic-native/nfc";
import 'rxjs/add/operator/map'
import { CompruebaPage } from '../comprueba/comprueba';
import { BrowserProvider } from '../../providers/browser/browser';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  compruebaPage = CompruebaPage;

  sauna_id: number = 1;
  scanned: boolean;
  tagId: string;
  comprobada: boolean;

  constructor(public browserProvider:BrowserProvider, public navCtrl: NavController, private nfc: NFC) {
    this.resetScanData();
  }

  resetScanData() {
    this.scanned = false;
    this.tagId = "";
    this.comprobada = false;
  }

  ionViewDidEnter() {
    this.nfc.enabled().then((resolve) => {
      this.addListenNFC();
    }).catch((reject) => {
      alert("NFC no soportado en este dispositivo.");
    });
  }

  addListenNFC() {

    this.nfc.addTagDiscoveredListener(nfcEvent => this.sesReadNFC(nfcEvent.tag)).subscribe(data => {
      if (data && data.tag && data.tag.id) {
        
        let tagId = this.nfc.bytesToHexString(data.tag.id);

        if (tagId) {
          this.tagId = tagId;
          this.scanned = true;
          this.comprobada = false;

          if(this.browserProvider.browserAbierto == true ){
          this.browserProvider.cerrarBrowser();
          }

          this.browserProvider.presentToast("Pulsera Reconocida");

          if( (this.scanned == true) && (this.comprobada == false) ){
            this.goComprueba();
          }

        } else {
          alert('NFC NO DETECTADO');
        }
      }
    });
  }

  sesReadNFC(data): void {
  }

  failNFC(err) {
    alert("Error de lectura: vuelva a intentarlo.");
  }

  goComprueba() {
    this.navCtrl.push(CompruebaPage, {
        tagId: this.tagId,
        sauna_id: this.sauna_id
    });
  }


}