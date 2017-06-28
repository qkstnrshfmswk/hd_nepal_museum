import {Component} from '@angular/core';
import {NavController,IonicPage} from 'ionic-angular';
import {Service} from '../../app/service';
import { Http } from '@angular/http';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [Service]
})
export class HomePage {
    categories: any[] = [];
    featured: any[] = [];
    cartItems: any[];
    noOfItems: number;
    
    main_img;
    
    constructor(public navCtrl: NavController, public service: Service, public http:Http) {
        this.http.get('http://ec2-34-224-40-186.compute-1.amazonaws.com:3000/main')
        .subscribe(
        data =>
        {
          this.main_img = data.json();
          console.log(this.main_img);
       
        },
        error =>
        {
          console.log("error");
        });


        this.cartItems = JSON.parse(localStorage.getItem('cartItem'));
        if (this.cartItems != null) {
            this.noOfItems = this.cartItems.length;
        }
        this.service.getData()
            .subscribe((response) => {
                this.categories = response.categories;
                this.featured = response.featured;
            })
    }

    navigate(MenuId) {
        this.navCtrl.push("ProductListPage",
            {MenuId: MenuId}
        );
    }

    navcart() {
        this.navCtrl.push("CartPage");
    }

}
