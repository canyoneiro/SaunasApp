import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser';
import { ToastController } from 'ionic-angular';

@Injectable()
export class BrowserProvider {

  browser: any;
  browserAbierto: boolean = false;

  options : InAppBrowserOptions = {
      location : 'no',
      hidden : 'no',
  };

  constructor(private toastCtrl: ToastController, public http: HttpClient, private theInAppBrowser: InAppBrowser) {
  }

  public openWithInAppBrowser(url : string){
    //let target = "_system";
    let target = "_self";
    this.browserAbierto = true;
    this.browser = this.theInAppBrowser.create(url,target,this.options);
  }

  public cerrarBrowser(){
    this.browser.close();
  }

  public nuevoUsuario(tagId: string, sauna_id: number){
    this.http.post('http://saunas.tellmetelecom.com/api/wristbandnewuser', {
      wristband: tagId,
      sauna_id: sauna_id
    }).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error");
        }
      );
    this.openWithInAppBrowser('http://saunas.tellmetelecom.com/users')
  }

  public cargaDinero(tagId: string, sauna_id: number){
    this.http.post('http://saunas.tellmetelecom.com/api/wristbandchargebag', {
      wristband: tagId,
      sauna_id: sauna_id
    }).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error");
        }
      );
    this.openWithInAppBrowser('http://saunas.tellmetelecom.com/bags')
  }

  public compraEntradas(tagId: string, sauna_id: number){
    this.http.post('http://saunas.tellmetelecom.com/api/wristbandbuyticket', {
      wristband: tagId,
      sauna_id: sauna_id
    }).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error");
        }
      );
    this.openWithInAppBrowser('http://saunas.tellmetelecom.com/bonus')
  }

  public entraSauna(tagId: string, sauna_id: number){
    this.http.post('http://saunas.tellmetelecom.com/api/wristbandentrysauna', {
      wristband: tagId,
      sauna_id: sauna_id
    }).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error");
        }
      );
    this.openWithInAppBrowser('http://saunas.tellmetelecom.com/newEntry')
  }

  public compraBebida(tagId: string, sauna_id: number){
    this.http.post('http://saunas.tellmetelecom.com/api/wristbandbuydrink', {
      wristband: tagId,
      sauna_id: sauna_id
    }).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error");
        }
      );
    this.openWithInAppBrowser('http://saunas.tellmetelecom.com/order')
  }


//Desbloqueamos todas las tablas para esta pulsera.
  public resetSauna(tagId: string){

    let url1 = 'http://saunas.tellmetelecom.com/api/wristbandnewuserused/' + tagId;
    this.http.put(url1,tagId).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error");
        }
      );

    let url2 = 'http://saunas.tellmetelecom.com/api/wristbandchargebagused/' + tagId;
    this.http.put(url2,tagId).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error");
        }
      );

    let url3 = 'http://saunas.tellmetelecom.com/api/wristbandbuyticketused/' + tagId;
    this.http.put(url3,tagId).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error");
        }
      );
    let url4 = 'http://saunas.tellmetelecom.com/api/wristbandentrysaunaused/' + tagId;
    this.http.put(url4,tagId).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error");
        }
      );
    let url5 = 'http://saunas.tellmetelecom.com/api/wristbandbuydrinkused/' + tagId;
    this.http.put(url5,tagId).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error");
        }
      );

    this.presentToast("Acciones de pulsera reseteadas");
  }


  presentToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Toast cerrado');
    });

    toast.present();
  }


}
