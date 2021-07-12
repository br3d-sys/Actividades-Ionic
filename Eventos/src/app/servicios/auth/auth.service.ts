import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app'
import { firebaseConfig } from 'src/app/evento/credenciales';
firebase.initializeApp(firebaseConfig)


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth:AngularFireAuth) { }

  async loginUsuario(usuario:string,password:string):Promise<firebase.auth.UserCredential>{
    return this.auth.signInWithEmailAndPassword(usuario,password)
  }

  async registrarUsuario(usuario:string, password:string):Promise<firebase.auth.UserCredential>{
    return this.auth.createUserWithEmailAndPassword(usuario,password)
  }

  async reiniciarContraseña(usuario:string):Promise<void>{
    return this.auth.sendPasswordResetEmail(usuario)
  }

  async cerrarSesion():Promise<void>{
    return this.auth.signOut()
  }

  obtenerUsuario(){
    return this.auth.currentUser
  }
}
