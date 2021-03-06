import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../../core/app.config';
import { ListDrinkService } from './list-drink.service';
import { MainService } from '../../main.service'
declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-list-drink',
  templateUrl: './list-drink.component.html',
  styleUrls: ['./list-drink.component.css']
})
export class ListDrinkComponent implements OnInit {
  public items: any
  public drink_avatar: string = ''
  public folder_avatar: string = CONFIG.BASE_API + '/uploads/imgDrink/';
  public list_drink: Array<any> = [];
  public idShop: number;
  public drink_name: string='';
  public drink_id:number;
  public drink_price: string ='';
  constructor(
    private _mainService: MainService,
    private _listdrinkService: ListDrinkService
  ) { }

  ngOnInit() {
    this.getIdShop();
    console.log(this.getIdShop());
    this.getDrink();
  }
  uploadImg(e) {
    var formData = new FormData();
    formData.append('avatar', e.target.files["0"]);
    $.ajax({
      url: CONFIG.BASE_API + '/boss/upload-imgDrink',
      type: 'POST',
      data: formData,
      processData: false,  // tell jQuery not to process the data
      contentType: false,  // tell jQuery not to set contentType
      success: (data) => {
        if (data.status == 'success') {
          toastr.success(data.message);
          this.drink_avatar = data.imgDrink;
          return;
        }
        if (data.status === 'error') {
          console.log(data);
        }
      }
    })
  }
  getIdShop() {
    this._mainService.getProfile().subscribe(res => {
      if (res.status == 'error') {
        console.log('error');
        return;
      }
      if (res.status == 'success') {
        this.idShop = res.user['user_shop_id'];
        console.log('id cua shop:' + this.idShop);
        this.getDrink();
        return;
      }
    })
  }
  getDrink() {
    let data = JSON.stringify({
      drink_shop_id: this.idShop,
    })
    this._listdrinkService.getDrink(data).subscribe(res => {
      if (res.status == 'error') {
        console.log('error');
        return;
      }
      if (res.status == 'success') {
        this.list_drink = res.drinks;
        console.log(this.list_drink);
        return;
      }
    }, error => {
      console.log('error');
      return;
    })
  }
  checkImg(img): Boolean {
    if (img == null) {
      return false
    }
    if (img != null)
    {
      return true
    }
  }
  selectDrink(drink)
  {
    this.drink_id = drink['drink_id'];
    this.drink_name = drink['drink_name'];
    this.drink_price = drink['drink_price'];
    this.drink_avatar = drink['drink_avatar'];
    console.log(drink)
  }
  updateDrink(){
    let drink = JSON.stringify({
      drink_id : this.drink_id,
      drink_name: this.drink_name,
      drink_avatar: this.drink_avatar,
      drink_price: this.drink_price
    })
    this._listdrinkService.updateDrink(drink).subscribe(res=>{
      if(res.status=='error')
      {
        console.log('error');
        return;
      }
      if(res.status =='success')
      {
        this.getDrink();
        toastr.success(res.message);
        return;
      }
    })
  }
  filterItemsOfType(type){
    return this.items.filter(x => x.drink_avatar == type);
  }
}
