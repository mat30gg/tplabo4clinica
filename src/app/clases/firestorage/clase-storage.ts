import { inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable } from "@angular/fire/storage";


export class ClaseStorage {
    private readonly storage: Storage = inject(Storage);

    subirArchivo(input: HTMLInputElement) {
        if(!input.files) return

        const archivos: FileList = input.files;

        for( let i = 0; i < archivos.length; i++) {
            const unArchivo = archivos.item(i);
            if(unArchivo){
                const storageRef = ref(this.storage, unArchivo.name);
                console.log(678);
                uploadBytesResumable(storageRef, unArchivo);
            }
        }
    }
}
