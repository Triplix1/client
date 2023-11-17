import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ImageSnippet } from '../_helpers/imageSnippet';

@Component({
  selector: 'app-create-film',
  templateUrl: './create-film.component.html',
  styleUrls: ['./create-film.component.scss']
})
export class CreateFilmComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    image: ['', Validators.required]
  });

  aspectRatio = '2:3';

  imageUrl: string | ArrayBuffer | null | undefined;

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  selectedFile: ImageSnippet | undefined;

  constructor(private _formBuilder: FormBuilder) { }

  handleFileInput(imageInput: any) {
    if (imageInput.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (this.isValidAspectRatio(img.width, img.height)) {
            this.imageUrl = e.target?.result;
          } else {
            alert('Please upload an image with a 2:3 aspect ratio.');
          }
        };
        img.src = URL.createObjectURL(imageInput.files[0]);
      };
      reader.readAsDataURL(imageInput.files[0]);
    }
  }

  private isValidAspectRatio(width: number, height: number): boolean {
    const expectedRatio = this.aspectRatio.split(':').map(Number);
    const actualRatio = [width, height].map(Number);
    return (actualRatio[0] / actualRatio[1]).toFixed(1) === (expectedRatio[0] / expectedRatio[1]).toFixed(1);
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
    });

    reader.readAsDataURL(file);
  }
}
