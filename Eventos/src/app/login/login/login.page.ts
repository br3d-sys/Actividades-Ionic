import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth/auth.service'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:any=[]

  constructor( public as:AuthService, public fb:FormBuilder, public router:Router, public ac:AlertController) { 

    this.loginForm = this.fb.group({
      userEmail:['', [Validators.required, Validators.email]],
      userPassword:['',Validators.required]
    })

  }

  ngOnInit() {
  }

  async onSubmit(event:Event){
    event.preventDefault()
    if(this.loginForm.valid){
      this.as.loginUsuario(this.loginForm.value.userEmail,this.loginForm.value.userPassword).then(
      ()=>{
        this.router.navigateByUrl('/start')
      },async error=>{
        const alerta = await this.ac.create({
          message: error.message,
          buttons:[
            {
              text:'OK', role:'cancel'
            }
          ]
        })
        await alerta.present()
      })
    }
    
  }

}
