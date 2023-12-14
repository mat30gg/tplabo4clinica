import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import * as Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
exporting( Highcharts );
import { RegistrosService } from 'src/app/servicios/registros.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {
  
  public regServ = inject(RegistrosService);

  constructor( private db: Firestore,  ) { 
    let hoy = new Date(); 
    hoy.setDate(hoy.getDate() + 3)
  }

  Highcharts: typeof Highcharts = Highcharts;

  isHighcharts = typeof Highcharts === 'object';

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: "Grafico de datos importantes",
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true
        }
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Cantidad de turnos',
        data: this.regServ.espeCant,
      }
    ]
  }

  //private chart = Highcharts.chart(this.chartOptions)

  public flagUpdate = false;
  public chartRef: Highcharts.Chart; 

  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
  }
  
  especialidadCantidad(){
    this.chartRef.series[0].name = "Cantidad de turnos"
    this.chartRef.series[0].setData( this.regServ.espeCant )
    this.chartRef.redraw();
  }

  turnosPorDia(){
    this.chartRef.series[0].name = "Cantidad de turnos"
    this.chartRef.series[0].setData( this.regServ.fechaCant )
    this.chartRef.redraw();
  }

  especialistaTurnosEnTiempo(){
    this.chartRef.series[0].name = "Cantidad de turnos"
    this.chartRef.series[0].setData( this.regServ.solicitudEspecialistaCant )
    this.chartRef.redraw();
  }

  especialistaTurnosFinalizadosEnTiempo(){
    this.chartRef.series[0].name = "Cantidad de turnos"
    this.chartRef.series[0].setData( this.regServ.finEspecialistaCant )
    this.chartRef.redraw();
  }
}
