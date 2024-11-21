import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service'

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  productForm: FormGroup;
  isEdit = false;
  productId: string | null = null;

  // Dependency Injection
  fb = inject(FormBuilder);
  productService = inject(ProductsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  notificationService = inject(NotificationService);

  constructor() {
    this.productForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.productId = id;
        this.productService.getProduct(this.productId).subscribe((data) => {
          this.productForm.patchValue(data);
        });
      }
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.notificationService.showError('Por favor, rellene todos los campos');
      return;
    }
        this.productService.createProduct(this.productForm.value).subscribe(
          (response) => {
            this.notificationService.showSuccess('Producto creado correctamente');
            this.router.navigate(['/']);
          },
          (error) => {
            this.notificationService.showError('Error al crear el Producto: ' + error.error);
          }
        );
    
  }

  goToRoot() {
    this.router.navigate(['/']);
  }

}
