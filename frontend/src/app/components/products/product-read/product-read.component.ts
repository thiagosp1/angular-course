import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Product } from '../product.model';
import { ProductReadDataSource } from './product-read-datasource';
import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})


export class ProductReadComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Product>;

  datasource: Product[] = []
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(private productService: ProductService) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  ngOnInit(): void {

    this.productService.read().subscribe(
      (receivedData) => {
        this.datasource = receivedData;
        console.log(receivedData);
        this.table.dataSource = this.datasource;
      });

  }
}
