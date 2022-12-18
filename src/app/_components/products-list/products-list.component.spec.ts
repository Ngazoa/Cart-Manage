import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { ProductModel } from 'src/app/_models/product-model';
import { ProductService } from 'src/app/_services/product.service';

import { ProductsListComponent } from './products-list.component';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  let service: ProductService;
  let httpSpy: Spy<HttpClient>;
  let fakearicles: ProductModel[] = [
    {
      id: 0,
      productName: "Fake article",
      price: 0,
      category: "",
      isImported: true,
      quantity: 102
    },
    {
      id: 0,
      productName: "Fake Customer",
      price: 750,
      category: "55r",
      isImported: true,
      quantity: 102
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });

    service = TestBed.inject(ProductService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

 
  it('should return component with userlist initialize', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakearicles);

    service.getProductList().subscribe(
      customers => {
        expect(customers).toHaveSize(fakearicles.length);
        done();
      },
      done.fail
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });
});
