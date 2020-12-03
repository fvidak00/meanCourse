import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  templateUrl:"./signup.component.html",
  styleUrls:["./signup.component.css"]
})
export class SignupComponent implements OnInit, OnDestroy{
  isLoading=false
  private authStatusSub:Subscription

  constructor(public authService:AuthService){}

  ngOnInit(){
    this.authStatusSub=this.authService
      .getAuthStatusListener()
      .subscribe(
        authStatus=>{
          this.isLoading=false
        }
      )
  }


  onSignup(form:NgForm){
    if(form.invalid){
      return
    }
    this.isLoading=true
    this.authService.createUser(form.value.email, form.value.password)
      // .subscribe({
      //   // If something fails, check this for section 122
      //   error: ()=>{
      //     this.isLoading=false
      //   }
      // })
  }

  ngOnDestroy(){
    this.authStatusSub
      .unsubscribe()
  }
}
