import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { UserGetDTO } from '../../models/user-get-dto';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: UserGetDTO | null = null;
  constructor(private usersService:UsersService,private router:Router){}
  ngOnInit(): void {
    this.usersService.user$.subscribe((user) => {
      this.user = user;
    });     
  }
  logout() {
    this.usersService.logout();
    this.router.navigateByUrl('login');
  }
}
