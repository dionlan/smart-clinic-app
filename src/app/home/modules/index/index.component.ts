import { Component, OnInit } from '@angular/core';
import { Index } from '.';
import { IndexService } from './index.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  index!: Index;

  constructor(
    private service: IndexService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.service.getData().subscribe(
      (res) => {
        this.index = res;
        console.log(this.index);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
