import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/servicios/auth/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm:FormGroup

  constructor(public router:Router, public as:AuthService, public fb:FormBuilder, public ac:AlertController) { 

    this.registerForm = this.fb.group({
      userEmail:['',[Validators.required, Validators.email]],
      userPassword:['',Validators.required]
    })

  }

  ngOnInit() {
  }

  async onSubmit(event:Event){
    event.preventDefault()
    if(this.registerForm.valid){
      this.as.registrarUsuario(this.registerForm.value.userEmail,this.registerForm.value.userPassword).then(
        ()=>{
          this.router.navigateByUrl('/login')
        }, async error=>{
          const Alert = await this.ac.create({
            message: error.message,
            buttons:[{
              text:'OK',
              role:'cancel'
            }] 
          })
          await Alert.present
        }
      )
    }
  }

}
