import { Injectable, signal } from '@angular/core';  //From angular/core Signals are new way of doing things https://angular.io/guide/signals 
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';      //Now our employee interface that was just created is now injectable.

@Injectable({                   //Injectable defines where the above is going to be used and is going to be used in the root
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'https://employee-app-mern-api.vercel.app';
  employees$ = signal<Employee[]>([]);          //Create two signals employees$ and employee$
  employee$ = signal<Employee>({} as Employee);
 
  constructor(private httpClient: HttpClient) { }

  private refreshEmployees() {
    this.httpClient.get<Employee[]>(`${this.url}/record`)    //Use httpClient to get /employees from our server 
      .subscribe(employees => {
        this.employees$.set(employees);             //Subscribe to This and set our variable  employees$ = signal<Employee[]>([]);
      });
  }

  getEmployees() {      //Then this runs the refresh and return employees$
    this.refreshEmployees();
    return this.employees$();
  }

  getEmployee(id: string) {         //This is going to get a single employee (employee$)
    //The ${id} defines our ID so on the server it is going to return an employee  
    this.httpClient.get<Employee>(`${this.url}/record/${id}`).subscribe(employee => {
      this.employee$.set(employee);  //Subscribe to This and set our variable  employee$ = signal<Employee[]>([]);

      return this.employee$();
    });
  }

  createEmployee(employee: Employee) {  //This passes in our employee to this function.  
    return this.httpClient.post(`${this.url}/record`, employee, { responseType: 'text' });
  }

  updateEmployee(id: string, employee: Employee) {
    return this.httpClient.put(`${this.url}/record/${id}`, employee, { responseType: 'text' });
  }

  deleteEmployee(id: string) {
    return this.httpClient.delete(`${this.url}/record/${id}`, { responseType: 'text' });
  }
}
