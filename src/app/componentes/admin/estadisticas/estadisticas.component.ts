import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import * as Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
exporting( Highcharts );
import jsPDF from 'jspdf';
import { EspecialidadesService } from 'src/app/servicios/datos/especialidades.service';
import { RegistrosService } from 'src/app/servicios/registros.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {

  public regServ = inject(RegistrosService);
  Highcharts: typeof Highcharts = Highcharts;

  isHighcharts = typeof Highcharts === 'object';
  chartOptions: Highcharts.Options = {
    exporting: {

    },
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
    series: [{
      type: 'pie',
      name: 'Cantidad de turnos',
      data: this.regServ.espeCant
    }]
  }

  //private chart = Highcharts.chart(this.chartOptions)

  public flagUpdate = false;
  public chartRef: Highcharts.Chart; 

  constructor( private db: Firestore,  ) { 
    let hoy = new Date(); 
    hoy.setDate(hoy.getDate() + 3)
    console.log( hoy.toDateString() )
  }

  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
  }
  
  especialidadCantidad(){
    this.chartRef.series = [];
    this.chartRef.addSeries({
      type: 'pie',
      name: 'Cantidad de turnos',
      data: this.regServ.espeCant
    })
    this.chartRef.redraw();
  }

  turnosPorDia(){
    this.chartRef.series = [];
    this.chartRef.addSeries({
      type: 'pie',
      name: 'Cantidad de turnos solicitados por dia',
      data: this.regServ.fechaCant
    })
    this.chartRef.redraw();
  }

  especialistaTurnosEnTiempo(){
    this.chartRef.series = [];
    this.chartRef.addSeries({
      type: 'pie',
      name: 'Cantidad',
      data: this.regServ.solicitudEspecialistaCant
    })
    this.chartRef.redraw();
  }

  especialistaTurnosFinalizadosEnTiempo(){
    this.chartRef.series = [];
    this.chartRef.addSeries({
      type: 'pie',
      name: 'Cantidad',
      data: this.regServ.finTurnoRegistros
    })
    this.chartRef.redraw();
  }
}
