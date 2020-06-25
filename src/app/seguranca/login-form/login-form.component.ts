import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private title: Title,
    private auth: AuthService) { }

  ngOnInit() {
    this.title.setTitle('Login');
  }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha);
  }
}