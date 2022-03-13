import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = { name: '', id: 0, price: 0 }
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const _id: string = id == null ? "" : id;
    this.productService.readById(_id).subscribe(data => { this.product = data })
  }

  deleteProduct(): void {
    if(this.product.id == undefined)
      throw 'Invalid Product';
    
      this.productService.delete(this.product.id.toString()).subscribe(
      () => {
        this.productService.showMessage('Produto apagado com sucesso!')
        this.navigateToProductList()
      })
  }
  cancel(): void {
    this.navigateToProductList()
  }

  private navigateToProductList(): void {
    this.router.navigate(['/products'])
  }
}
