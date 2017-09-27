import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  PageName : string;
  Areas : string[];
  Mostrar_Ocultar : boolean;
  Mostrar_NuevaNota : boolean;
  Editando:boolean;
  NC={title:null,description:null };

  Notas_Existentes: any;
  constructor(public afDB: AngularFireDatabase){
    this.ObtenerNotas()
        .subscribe(
          NuevosComentarios=>{
            this.Notas_Existentes=NuevosComentarios;
          }
        )
    this.PageName = 'Geckotronics';
    this.Areas = [ 
    'Automatización de Ambientes y Edificios',
    'Automatización de Procesos industriales',
    'Energías renovables',
    'Cámaras de Video-vigilancia',
    'Control de Accesos',
    'Instalación y Congiguración',
    'Soporte y Asesoramiento'
    ];
    this.Mostrar_NuevaNota=false;
    this.Editando=false;

  }

  ObtenerNotas(){
    //"BDComentarios" es el nombre que le pusimos a la lista en Firebase
    return this.afDB.list('/BDComentarios');
  }

  CambiarM_O(){
    this.Mostrar_Ocultar = !this.Mostrar_Ocultar;
  }

  AgregarArea(NuevaArea){
    this.Areas.push(NuevaArea.value);
    NuevaArea.value='';
    return false;
  }

  NuevaNota(){
    this.Mostrar_NuevaNota=true;
    this.NC={title:null, description:null};
    this.Editando=false;
  }

  EditarNota(nota){
    this.Editando=true;
    this.NC=nota;
    this.afDB.database.ref('BDComentarios/' + this.NC.title).set(this.NC);
    this.Mostrar_NuevaNota=true;
    
  }

  CrearNota(){
    this.afDB.database.ref('BDComentarios/' + this.NC.title).set(this.NC);
  
    /*if(this.Editando){
      var me=this;
      this.Notas_Existentes.forEach(
        function(TituloNota,IndexNota){
          if(TituloNota.title===me.NC.title){
            me.Notas_Existentes[IndexNota]=me.NC;
          }
        }
      );
    }
    else{
      this.Notas_Existentes.push(this.NC);
    }*/
    this.Mostrar_NuevaNota= false;
    this.NC={title: null, description: null};
  }

 EliminarNota(){
  this.afDB.database.ref('BDComentarios/' + this.NC.title).remove();
  this.Mostrar_NuevaNota= false;
  this.NC={title: null, description: null};
    /*var me=this;
    this.Notas_Existentes.forEach(
      function(TituloNota,IndexNota){
        if(TituloNota===me.NC){
          me.Notas_Existentes.splice(IndexNota,1);
        }
      }
    );
    this.Mostrar_NuevaNota= false;
    this.NC={title: null, description: null};*/
  }

  Cancelar(){
    this.Mostrar_NuevaNota=false;
  }
}
