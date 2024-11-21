import { ProductsService } from '../services/products.service';
import { product } from '../models/product.interface';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  imports: [NgxPaginationModule, CommonModule, FormsModule],
})
export class ProductListComponent implements OnInit{

   productService = inject(ProductsService);
   router = inject(Router);
   products: product[] = [];
   productbyId: product[] = [];
   page: number = 1;
   searchTerm: string = '';
   filteredProducts: product[] = [];

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (data) => {
        //console.log('Data received:', data); // Log the received data
        this.products = data;
        this.filteredProducts = this.products;
        //console.log('Products after assignment:', this.products); // Log the products after assignment
      },
      (error) => {
        console.error('Error fetching products:', error); // Log any errors
      }
    );
  }


  goToCreate() {
    this.router.navigate(['/create']);
  }

  goMoveStock(id: string, typeMov: string) {
    if (typeMov === 'INPUT') {
      this.router.navigate(['/movement-stock', id, typeMov]);
    }
     else {
      this.productbyId = this.products.filter(product => product.id === Number(id));

      this.router.navigate(['/movementlist'], {state: { product: this.productbyId, typeMov  } });
    }
  }

  goToWatch(id: string) {
    this.productbyId = this.products.filter(product => product.id === Number(id));
    this.router.navigate(['/movementlist'], {state: { product: this.productbyId } });
  }

  goToMovementList() {
    this.router.navigate(['/movementlist'], { state: { products: this.products } });
  }

  ngOnChanges() {
    this.filterProducts();
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
