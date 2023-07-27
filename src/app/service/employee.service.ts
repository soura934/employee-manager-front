import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiServer = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServer}/employee/all`);
  }
  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServer}/employee/add`, employee);
  }
  public getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiServer}/employee/find/${id}`);
  }
  public editEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(
      `${this.apiServer}/employee/update`,
      employee
    );
  }
  public removeEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServer}/employee/delete/${id}`);
  }
}
