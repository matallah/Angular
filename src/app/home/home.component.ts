import {Component, OnInit} from '@angular/core';
import {ConfigService, FooService, UserService} from '../service';
import {ProductService} from "../service/product.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private config: ConfigService,
              private fooService: FooService,
              private userService: UserService,
              private productService: ProductService) {
    this.product = new Product();
  }

  public product: Product;

  ngOnInit() {
  }

  doSaveProduct() {
    this.productService.doSave(this.product);
  }

}

export class Product {
  productID: number = null;
  name = '';
  description = '';
  minPrice = null;
  maxPrice = null;
}

export class Operator {
  operatorid: number;
  name: string;
  country: string;
}

export class Services {
  servicesid: number;
  name: string;
  type: string;
  operator: Operator;
}
