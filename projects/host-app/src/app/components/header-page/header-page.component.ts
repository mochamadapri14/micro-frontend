import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

  }

  toggle(): void {
    const element = document.body as HTMLBodyElement;
    element.classList.toggle('toggle-sidebar');
  }

}
