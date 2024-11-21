import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { movement } from '../models/movement.interface';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {
  private apiUrl = 'http://localhost:8080/api'; // this endpoint was generated in Step 3
  http = inject(HttpClient);

  createMovementInput(inputData: any): Observable<movement> {
    console.log('inputData:', inputData);
    return this.http.post<movement>(`${this.apiUrl}/input_inventory`, inputData);
  }

  createMovementOutput(outputData: any): Observable<movement> {
    console.log('outputData:', outputData);
    return this.http.post<movement>(`${this.apiUrl}/out_inventory`, outputData);
  }

  getMovement(id: string): Observable<movement> {
    return this.http.get<movement>(`${this.apiUrl}/movement/${id}`);
  }


}
