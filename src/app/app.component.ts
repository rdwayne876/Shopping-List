import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface shoppingItems{
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
  itemCategory: string;
  itemNotes: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class AppComponent implements OnInit{
  title = 'Awesome Shopping List';

  displayedColumns: string[] = ['Name', 'Quantity', 'Price'];
  dataSource!: MatTableDataSource<any>;
  expandedItem: shoppingItems | null | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api : ApiService) {}
  
  ngOnInit(): void {
  }

  openDialog(){
    this.dialog.open(DialogComponent, {
      width: '90%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllItems();
      }
    })
    ;
  }

  getAllItems(){
    this.api.getItem()
    .subscribe({
      next:(res) =>{
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      },
      error: (err) =>{
        alert("Oops, something went wrong...")
      }
    })
  }

  
}
