import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Product} from "../modules/modules";
import {ConfigService} from "./config.service";
import {ApiService} from "./api.service";

@Injectable()
export class DataService {
  // private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';
  private readonly API_URL = 'http://localhost:8090/api/product/all';

  dataChange: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient,
              private apiService: ApiService,
              private config: ConfigService) {
  }

  get data(): Product[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.httpClient.get<Product[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
    // return this.apiService.get(this.config.products_url);
  }

  // DEMO ONLY, you can find working methods below
  addIssue(issue: Product): void {
    this.dialogData = issue;
  }

  updateIssue(issue: Product): void {
    this.dialogData = issue;
  }

  deleteIssue(id: number): void {
    console.log(id);
  }
}


/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

 // ADD, POST METHOD
 addItem(kanbanItem: KanbanItem): void {
 this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
 this.dialogData = kanbanItem;
 this.toasterService.showToaster('Successfully added', 3000);
 },
 (err: HttpErrorResponse) => {
 this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
 });
 }

 // UPDATE, PUT METHOD
 updateItem(kanbanItem: KanbanItem): void {
 this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
 this.dialogData = kanbanItem;
 this.toasterService.showToaster('Successfully edited', 3000);
 },
 (err: HttpErrorResponse) => {
 this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
 }
 );
 }

 // DELETE METHOD
 deleteItem(id: number): void {
 this.httpClient.delete(this.API_URL + id).subscribe(data => {
 console.log(data['']);
 this.toasterService.showToaster('Successfully deleted', 3000);
 },
 (err: HttpErrorResponse) => {
 this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
 }
 );
 }
 */




