import { Component, OnInit } from '@angular/core';
import { Employee } from './model/employee';
import { EmployeeService } from './service/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  public editEmployee?: Employee;
  public deleteEmployee?: Employee;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (res: Employee[]) => {
        this.employees = res;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onModalOpen(status: string, employee?: Employee): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (status === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (status === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (status === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

  onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe({
      next: (response: Employee) => {
        this.getEmployees();
        addForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      },
    });
  }

  onEditEmployee(employee: Employee): void {
    this.employeeService.editEmployee(employee).subscribe({
      next: (response: Employee) => {
        this.getEmployees();
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      },
    });
  }

  onDeleteEmployee(employeeId: number): void {
    console.log(employeeId);
    this.employeeService.removeEmployee(employeeId).subscribe({
      next: (response: void) => {
        this.getEmployees();
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      },
    });
  }
}
