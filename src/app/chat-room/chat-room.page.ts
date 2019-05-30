import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';
import { AlertOptions, ToastOptions } from '@ionic/core';


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {

  private userInfo: any;
  room: string;
  chatRoomRef: any;
  chatRoom: Observable<any>;

  constructor(
    private firedb: AngularFireDatabase,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    let info: string = localStorage.getItem("userInfo");
    this.userInfo = JSON.parse(info);
    this.room = this.userInfo.room;
    this.chatRoomRef = firedb.list('cr-' + this.room);
    this.chatRoom = this.chatRoomRef.valueChanges();
  }

  ngOnInit() {
  }

  async newMessage() {
    let options: AlertOptions = {
      header: "Envío de mensaje",
      inputs: [
        {
          name: "message",
          type: "text",
          placeholder: "Escribe mensaje"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary"
        },
        {
          text: "Enviar",
          handler: (result) => {
            console.log(result);
            let message: any = {
              user: this.userInfo.user,
              date: new Date().toString(),
              message: result.message
            }
            this.sendMessage(message);
          }
        }
      ]
    };
    let alert = await this.alertCtrl.create(options);
    await alert.present();
  }

  private async sendMessage(message: any) {
    this.chatRoomRef.push(message);
    let options: ToastOptions = {
      message: "Mensaje enviado...",
      duration: 3000
    };
    let toast = await this.toastCtrl.create(options);
    await toast.present();
  }
}
