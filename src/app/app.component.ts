import { Component, OnInit } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}
  
  async ngOnInit() {

    const getTypeNetwork = async () => {
      return (await Network.getStatus()).connectionType;
    }

    const showHelloToast = async () => {
      await Toast.show({
        text: `Votre type de connexion : ${await getTypeNetwork()}`,
        duration: 'long'
      });
    };
    
    await showHelloToast();
  }
}
