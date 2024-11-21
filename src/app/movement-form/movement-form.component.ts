import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MovementsService } from '../services/movements.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { conditionalRequiredValidator } from '../validators/conditional-required.validator';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../services/notification.service'



@Component({
  selector: 'app-movement-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './movement-form.component.html',
  styleUrl: './movement-form.component.css'
})
export class MovementFormComponent {

  movementForm: FormGroup;
  productId: string | null = null;
  typeMov: string | null = null;
  idLote: string | null = null;

    // Dependency Injection
    fb = inject(FormBuilder);
    movementService = inject(MovementsService);
    router = inject(Router);
    route = inject(ActivatedRoute);
    notificationService = inject(NotificationService);

    constructor() {
        this.movementForm = this.fb.group({
          quantity: ['', Validators.required],
          expirationDate: ['', conditionalRequiredValidator(() => this.typeMov === 'INPUT')],
        });
    }

    ngOnInit() {
      this.route.paramMap.subscribe((params) => {
        const id = params.get('idproduct');
        const idLote = params.get('idLote');
        const typeMov = params.get('typemov');

        

        if (id) {
          this.productId = id;
          this.typeMov = typeMov;
          this.idLote = idLote;
        }
      });
    }

    onSubmit() {
      if (this.movementForm.invalid){
        this.notificationService.showError('Por favor, rellene todos los campos');
        return;
      }

      const formValues = this.movementForm.value;

        if(this.typeMov === 'INPUT'){
          const defaultValues = {
            product: {"id":this.productId},
            dateMov: new Date(), // Default date
            typeMov: this.typeMov // Default type
          };
      
          const movementData = { ...formValues, ...defaultValues };
          this.movementService.createMovementInput(movementData).subscribe(
            (response) => {
              this.notificationService.showSuccess('Movimiento realizado correctamente');
              this.router.navigate(['/']);
            },
            (error) => {
              this.notificationService.showError('Error al ejecutar el movimiento: ' + error.error);
            }
          );



        }else{

          let movement = {product: {"id":this.productId},
                                  typeMov: this.typeMov};
          movement = {...formValues, ...movement};                  

          const movementData = {
            movement,
            applyoninput:this.idLote
          };

          //const movementData = { ...formValues, ...defaultValues };
          this.movementService.createMovementOutput(movementData).subscribe(
            (response) => {
              this.notificationService.showSuccess('Movimiento realizado correctamente');
              this.router.navigate(['/']);
            },
            (error) => {
              this.notificationService.showError('Error al ejecutar el movimiento: ' + error.error);
            }
          );
        }
      
    }

    goToRoot() {
      this.router.navigate(['/']);
    }

}
