import {Injectable} from '@angular/core';
import {ConfigService} from "../service/config.service";
import {ApiService} from "../service/api.service";
import {HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProductService {

  constructor(private apiService: ApiService,
              private config: ConfigService) {
  }

  doSave(object): Observable<any> {
    const signupHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.apiService.post(this.config.product_url, JSON.stringify(object), signupHeaders).map(() => {
      console.log("Save success");
    });
  }

  doUpdate(object): Observable<any> {
    const signupHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.apiService.put(this.config.product_url, JSON.stringify(object)).map(() => {
      console.log("Update success");
    });
  }

  doDelete(object){
    return this.apiService.delete(this.config.product_url, JSON.stringify(object)).map(() => {
      console.log("Update success");
    });
  }

  getAllProducts() {
    return this.apiService.get(this.config.products_url);
  }

}
