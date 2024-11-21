import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { MovementFormComponent } from './movement-form/movement-form.component';
import { MovementListComponent } from './movement-list/movement-list.component';

export const routes: Routes = [
    {path: '', component: ProductListComponent},
    { path: 'create', component: ProductFormComponent },
    { path: 'movement-stock/:idproduct/:typemov', component: MovementFormComponent },
    { path: 'movement-stockOut/:idproduct/:idLote/:typemov', component: MovementFormComponent },
    { path: 'movementlist', component: MovementListComponent },
];
