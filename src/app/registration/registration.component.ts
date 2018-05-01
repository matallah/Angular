import {Component, OnInit} from '@angular/core';
import {ProductService} from "../service/product.service";

class Product {
  productID: number = null;
  name = '';
  description = '';
  minPrice = null;
  maxPrice = null;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // It maintains list of Registrations
  products: any;
  // It maintains registration Model
  product: Product;
  // It maintains registration form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  // It maintains table row index based on selection.
  selectedRow: number;
  // It maintains Array of countries.
  countries: string[] = ['US', 'UK', 'India', 'UAE'];

  constructor(private productService: ProductService) {
    // Add default registration data.
    productService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log(data)
    });
  }

  ngOnInit() {
  }

  // This method associate to New Button.
  onNew() {
    // Initiate new registration.
    this.product = new Product();
    // Change submitType to 'Save'.
    this.submitType = 'Save';
    // display registration entry section.
    this.showNew = true;
  }

  // This method associate to Save Button.
  onSave() {
    if (this.submitType === 'Save') {
      // Push registration model object into registration list.
      this.productService.doSave(this.product).subscribe(data => {
          console.log(data);
          this.products.push(this.product);
        },
        error => {
          console.log("Save error" + JSON.stringify(error));
        });
    } else {
      // Update the existing properties values based on model.
      this.productService.doSave(this.product).subscribe(data => {
          console.log(data);
          this.products.push(this.product);
        },
        error => {
          console.log("Save error" + JSON.stringify(error));
        });
    }
    // Hide registration entry section.
    this.showNew = false;
  }

  // This method associate to Edit Button.
  onEdit(index: number) {
    // index = index - 1;
    // Assign selected table row index.
    this.selectedRow = index;
    // Initiate new registration.
    this.product = new Product();
    // Retrieve selected registration from list and assign to model.
    this.product = Object.assign({}, this.products[this.selectedRow]);
    // Change submitType to Update.
    this.submitType = 'Update';
    // Display registration entry section.
    this.showNew = true;
  }

  // This method associate to Delete Button.
  onDelete(index: number) {
    // Delete the corresponding registration entry from the list.
    this.productService.doDelete(index).subscribe(data => {
      this.products.splice(index, 1);

    });
  }

  // This method associate toCancel Button.
  onCancel() {
    // Hide registration entry section.
    this.showNew = false;
  }

}
