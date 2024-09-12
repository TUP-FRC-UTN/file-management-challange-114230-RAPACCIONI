import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-file-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './file-form.component.html',
  styleUrl: './file-form.component.css'
})
export class FileFormComponent {


  @Output() fileCreated = new EventEmitter<any>();

  existingFolders: string[] = ["Carpeta 1", "Carpeta 2"];
  newFile: any = {
    nombre: '',
    fecha: '',
    tipo: 'Archivo',
    carpetaPadre: '',
    duenios: []
  };
  duenioActual: string = '';


  createFile(form: NgForm) {
    if(form.valid){
      this.fileCreated.emit({
        ...this.newFile,
        duenios: this.newFile.duenios || [] 
      });
      form.reset();
    }
  }
  addDuenio() {
    if(this.duenioActual && !this.newFile.duenios.includes(this.duenioActual)){
      this.newFile.duenios.push(this.duenioActual);
      this.duenioActual = '';
    }
  }
  deleteDuenio(index: number) {
    this.newFile.duenios.splice(index, 1);
  }

}
