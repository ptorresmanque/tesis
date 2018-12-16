import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {
  public lineChartData: Array<any> = [
    {data: [], label: 'Temperatura'}
  ];
  public lineChartLabels: Array<String> = [];
  constructor(private http: HttpClient, public wsService: WebsocketService) { }

  public temperatura: Array<number> = new Array();
  public fechas: Array<any> = new Array();

  ngOnInit() {
    this.getData();
    this.escucharSocket();
  }

  getData() {
    this.http.get('http://localhost:5000/muestras').subscribe( data => {
      console.log(data);
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          const muestra = data[i];
          for (const j in muestra) {
            if (muestra.hasOwnProperty(j)) {
              const element =  Number(muestra[j].Temperatura);
              this.temperatura.push(element);
              this.lineChartLabels.push(muestra[j].date);
            }
          }
        }
      }
      this.lineChartLabels.reverse();
      this.temperatura.reverse();
      this.lineChartData = [
        {data: this.temperatura, label: 'Temperatura'}
      ];
    });
  }

  escucharSocket() {

    this.wsService.listen('nuevo-dato').subscribe((data: any) =>  {
      console.log(data);
      this.temperatura.push(data.Temperatura);
      if (this.temperatura.length > 1000) {
        this.temperatura.reverse();
        this.temperatura.pop();
        this.temperatura.reverse();
      }
      this.lineChartLabels.push(data.date);
      if (this.lineChartLabels.length > 1000) {
        this.lineChartLabels.reverse();
        this.lineChartLabels.pop();
        this.lineChartLabels.reverse();
      }
      this.lineChartData = [
        {data: this.temperatura, label: 'Temperatura'}
      ];
    });
  }

}
