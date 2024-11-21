import { MovementsService } from '../services/movements.service';
import { movement } from '../models/movement.interface';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../models/product.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-movement-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movement-list.component.html',
  styleUrl: './movement-list.component.css'
})
export class MovementListComponent implements OnInit{
  movementService = inject(MovementsService);
   router = inject(Router);
   movements: movement[] = [];
   idProduct: string = '';
   viewAll: boolean = false;

   products: product[] = [];

   constructor() {
     const navigation = this.router.getCurrentNavigation();
     if (navigation?.extras.state) {
       this.products = navigation.extras.state['product'];
       if(navigation.extras.state['typeMov']) {
        if (this.products.length > 0 && this.products[0].movements) {
          this.idProduct = this.products[0].id.toString();
          this.movements = this.products[0].movements.filter((movement) => movement.typeMov === 'INPUT');
        }

       }else{
        this.movements = this.products[0].movements;
        this.viewAll = true;
       }
     }
   }

    ngOnInit() {
    /*this.movementService
    .getProducts()
    .subscribe((data) => (this.products = data))


    console.log(this.products);*/
  }

  goToSelectLot(idMov: string, id: string) {
    this.router.navigate(['/movement-stockOut', id, idMov , 'OUT']);
  }

  goToRoot() {
    this.router.navigate(['/']);
  }
  
}
