import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth/auth.service';


@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {

  recoveryForm:FormGroup

  constructor(public router:Router, public ac:AlertController, public as:AuthService, public fb:FormBuilder) { 

    this.recoveryForm = this.fb.group({
      userEmail:['',[Validators.required, Validators.email]]
    })

  }

  ngOnInit() {
  }

async onSubmit(event:Event){
  event.preventDefault
  if (this.recoveryForm.valid) {
     this.as.reiniciarContraseña(this.recoveryForm.value.userEmail).then(
      async ()=>{
        const Alerta = await this.ac.create({
          message:'Revisa el correo que te enviamos para restaurar la contraseña',
          buttons:[{
            text:'Ok',
            role:'cancel',
            handler:()=>{
              this.router.navigateByUrl('/login')
            }
          }]
        })
        await Alerta.present()
      }, async error=>{
        const Alert = await this.ac.create({
          message:error.message,
          buttons:[{
            text:'Ok',
            role:'cancel'
          }]
        })

        Alert.present
      }
    )
    
  }
}

}
