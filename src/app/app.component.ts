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

  onModalOpen(status: string, employee?: Employee): void {
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

  searchEmployees(key: string): void {
    const results: Employee[] = [];

    for (let employee of this.employees) {
      if (
        employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(employee);
      }
    }

    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }
}
