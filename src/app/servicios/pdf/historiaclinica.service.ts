import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class HistoriaclinicaService {

  constructor( private db: Firestore) { }

  private headerPdf( doc : jsPDF ){
    
    let img = new Image();
    img.src = "assets/logoclinica.png";
    doc.addImage(img, 'png', 80, 10, 50, 50);
    doc.line(10, 62, 200, 62)
  }

  private datosPdf( doc: jsPDF, datos: any){
    console.log(datos)
    let datosFisicos = [
      "Altura: "+datos.datosEstaticos.altura+'cm',
      "Peso: "+datos.datosEstaticos.peso+'kg',
      "Temperatura: "+datos.datosEstaticos.temperatura+'°C',
      "Presion: "+datos.datosEstaticos.presion+'mm Hg',
    ];

    let datosDinamicos = datos.datosDinamicos.map( (val: any) => {
      return val.clave+": "+val.valor
    });



    doc.setFont('helvetica', 'bold');
    doc.text("RAZON DE LA CONSULTA", 20, 76 );
    doc.text("DATOS FISICOS", 20, 108.5 );
    doc.text("OTROS DATOS", 20, 140 );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(datos.fechaEmision, 20, 70);
    doc.text(datos.datosEstaticos.comentario, 20, 82, {maxWidth: 170});
    doc.text(datosFisicos, 20, 113.5, {maxWidth: 170});
    doc.text(datosDinamicos, 20, 146)
  }

  crearPdfHistoriaClinica( usuario: any){
    const doc = new jsPDF();
    
    // Tamanio letra = 3mm
    // Interlineado = 1.5mm
    // 4.5

    this.headerPdf(doc);

    doc.text(new Date().toLocaleDateString(), 20, 20);
    
    doc.setFontSize(20);
    doc.text("HISTORIA CLINICA", 105, 70, {align: 'center'});
    doc.setFontSize(11);
    
    let datosPersonales = [
      "Nombre: "+usuario.nombre,
      "Apellido: "+usuario.apellido,
      "DNI: "+usuario.dni,
      "Edad: "+usuario.edad,
      "Obra social: "+usuario.obraSocial
    ];
    
    doc.setFont('helvetica', 'bold');
    doc.text("DATOS PERSONALES", 20, 78 );
    
    doc.setFont('helvetica', 'normal');
    doc.text(datosPersonales, 20, 83, {maxWidth: 170 });

    getDocs( collection(this.db, 'usuarios', usuario.email, 'historialclinico') )
    .then( documentos => 
      {
      documentos.docs
      .forEach(  hist => 
        {
          doc.addPage();
          this.headerPdf( doc );
          this.datosPdf( doc, hist.data() );
        })  
      })
    .finally( () => 
      {
        doc.save('historiaclinica');
      })

    
  }
}
