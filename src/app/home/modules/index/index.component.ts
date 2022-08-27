import { Component, OnInit } from '@angular/core';
import { Index } from '.';
import { IndexService } from './index.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  index!: Index;

  constructor(
    private service: IndexService,
  ) { }

  ngOnInit(): void {
    //this.getData();
  }

  private getData(): void {
    this.service.getData().subscribe(
      (res) => {
        this.index = res;
        console.log('RESULTADO HOME', this.index);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
