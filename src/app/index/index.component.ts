import { Component, OnInit, Injectable } from '@angular/core';
import { ShareService } from '../share.service';
import { Observable } from 'rxjs';
import { PharmacyTurn } from '../model/pharmacy-turn';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

@Injectable()
export class IndexComponent implements OnInit {

  public shares: Observable<any[]>;
  pharmacies: PharmacyTurn[];
  replacePharmacies = [{ name: 'Del Pueblo', id: '1' },
  { name: 'Galvagni', id: '2' },
  { name: 'Grossi', id: '3' },
  { name: 'Mariani', id: '4' },
  { name: 'Migliaro', id: '5' },
  { name: 'Ortelli', id: '6' },
  { name: 'Solé', id: '7' },
  { name: 'Tugues', id: '8' },
  { name: 'Arroyo', id: '9' },
  { name: 'Canal', id: '10' },
  { name: 'Capaldi', id: '11' },
  { name: 'Colombi', id: '12' },
  { name: 'Coradello', id: '13' },
  { name: 'Conti', id: '14' },
  { name: 'Belmartino', id: '15' }];
  loading = false;

  constructor(private shareservice: ShareService) { }

  ngOnInit() {
    const token = '16acd359cb1e6dced49963ac5dc350ccbccfab7e';
    const month = '11';
    const year = '2019';
    const urlMonth = 'https://wuik.com.ar/services/farmacia-admin-service-salto.php?token=' + token + '&mes=' + month + '&anio=' + year;

    this.shareservice
      .getListOfGroup(urlMonth)
      .subscribe(
        data => {
          this.pharmacies = data.turnos;
          console.log(this.pharmacies);
        },
        err => {
          console.log(err);
        }
      );
  }

  changePharmacy(selectedValue: string, regId: string) {
    this.loading = true;
    const token = '16acd359cb1e6dced49963ac5dc350ccbccfab7e';
    const urlChange = 'https://wuik.com.ar/services/update-turno-admin-salto.php?token=' + token + '&farmacia_reemplazo=' + selectedValue + '&id=' + regId;
    console.log('value is ', selectedValue, regId, urlChange);
    this.shareservice
      .getListOfGroup(urlChange)
      .subscribe(
        data => {
          console.log(data.status);
          this.loading = false;
          if (data.status !== 'ok') {
            alert('Error en cambio con ID:' + regId);
          }
        },
        err => {
          console.log(err);
          this.loading = false;
        }
      );
  }
}