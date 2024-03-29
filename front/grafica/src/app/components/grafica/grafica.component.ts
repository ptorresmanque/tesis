import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {
  public lineChartDataTemperatura: Array<any> = [
    {data: [], label: 'Temperatura', pointRadius: 0, lineTension: 0}
  ];
  public lineChartDataHumedad: Array<any> = [
    {data: [], label: 'Humedad', pointRadius: 0, lineTension: 0}
  ];
  public lineChartDataPM10: Array<any> = [
    {data: [], label: 'PM10', pointRadius: 0, lineTension: 0}
  ];
  public lineChartDataPM25: Array<any> = [
    {data: [], label: 'PM2.5', pointRadius: 0, lineTension: 0}
  ];

  public lineChartLabels: Array<String> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  constructor(private http: HttpClient, public wsService: WebsocketService) { }

  public temperatura: Array<number> = new Array();
  public humedad: Array<number> = new Array();
  public pm10: Array<number> = new Array();
  public pm25: Array<number> = new Array();
  public fechas: Array<any> = new Array();

  public lastTemperatura;
  public lastHumedad;
  public lastTime;

  ngOnInit() {
    this.getData();
    this.escucharSocket();
  }

  getData() {
    this.http.get('http://138.68.45.13:5000/muestras').subscribe( data => {
      console.log(data);
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          const muestra = data[i];
          for (const j in muestra) {
            if (muestra.hasOwnProperty(j)) {
              this.temperatura.push(muestra[j].Temperatura);
              this.humedad.push(muestra[j].Humedad);
              this.pm10.push(muestra[j].PM10);
              this.pm25.push(muestra[j].PM25);
              this.lineChartLabels.push(muestra[j].date);
            }
          }
        }
      }
      this.lastTime = this.lineChartLabels[0];
      this.lineChartLabels.reverse();
      this.lastTemperatura = this.temperatura[0];
      this.lastHumedad = this.humedad[0];
      this.temperatura.reverse();
      this.humedad.reverse();
      this.pm10.reverse();
      this.pm25.reverse();
      this.lineChartDataTemperatura = [
        {data: this.temperatura, label: 'Temperatura'}
      ];
      this.lineChartDataHumedad = [
        {data: this.humedad, label: 'Humedad'}
      ];
      this.lineChartDataPM10 = [
        {data: this.pm10, label: 'PM10'}
      ];
      this.lineChartDataPM25 = [
        {data: this.pm25, label: 'PM2.5'}
      ];
    });
  }

  escucharSocket() {

    this.wsService.listen('nuevo-dato').subscribe((data: any) =>  {
      console.log(data);
      this.temperatura.push(data.Temperatura);
      if (this.temperatura.length > 1000) {
        this.temperatura.reverse();
        this.lastTemperatura = this.temperatura[0];
        this.temperatura.pop();
        this.temperatura.reverse();
      }
      this.humedad.push(data.Humedad);
      if (this.humedad.length > 1000) {
        this.humedad.reverse();
        this.lastHumedad = this.humedad[0];
        this.humedad.pop();
        this.humedad.reverse();
      }
      this.pm10.push(data.PM10);
      if (this.pm10.length > 1000) {
        this.pm10.reverse();
        this.pm10.pop();
        this.pm10.reverse();
      }
      this.pm25.push(data.PM25);
      if (this.pm25.length > 1000) {
        this.pm25.reverse();
        this.pm25.pop();
        this.pm25.reverse();
      }
      this.lineChartLabels.push(data.date);
      if (this.lineChartLabels.length > 1000) {
        this.lineChartLabels.reverse();
        this.lastTime = this.lineChartLabels[0];
        this.lineChartLabels.pop();
        this.lineChartLabels.reverse();
      }
      this.lineChartDataTemperatura = [
        {data: this.temperatura, label: 'Temperatura'}
      ];
      this.lineChartDataHumedad = [
        {data: this.humedad, label: 'Humedad'}
      ];
      this.lineChartDataPM10 = [
        {data: this.pm10, label: 'PM10'}
      ];
      this.lineChartDataPM25 = [
        {data: this.pm25, label: 'PM2.5'}
      ];
    });
  }

}
