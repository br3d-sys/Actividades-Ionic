import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import validator from 'validator';
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
//agregando campos y formulario
  loginForm = new FormGroup({
    userEmail: new FormControl(''),
    userPassword: new FormControl(''),
  })

  loginFormValidator= {
    userEmail:{
      empty:'',
      email:'',
    },
    userPassword:{
      empty:'',
    }
  }

  constructor(public NC:NavController) { }

  ngOnInit() {
  }

  formValidator():boolean{
    if(validator.isEmpty(this.loginForm.value.userEmail)){
      this.loginFormValidator.userEmail.empty="La direccion de correo es requerida"
      return false
    }else{
      this.loginFormValidator.userEmail.empty=""
    }
    if(!validator.isEmail(this.loginForm.value.userEmail)){
      this.loginFormValidator.userEmail.email="Ingrese un Correo Válido"
      return false
    }else{
      this.loginFormValidator.userEmail.email=""
    }
    if(validator.isEmpty(this.loginForm.value.userPassword)){
      this.loginFormValidator.userPassword.empty="La contraseña es requerida"
      return false
    }else{
      this.loginFormValidator.userPassword.empty=""
    }
    return true
  }

  onSubmit(){
    if(this.formValidator()){
      this.NC.navigateForward('/home')
    }
  }

}

