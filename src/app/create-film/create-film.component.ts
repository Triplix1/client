import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ImageSnippet } from '../_helpers/imageSnippet';
import { GenreService } from '../_services/genre.service';
import { FilmAddRequest } from '../Dto/Film/flimAddRequest';
import { FilmService } from '../_services/film.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmUpdateRequest } from '../Dto/Film/filmUpdateRequest';

@Component({
  selector: 'app-create-film',
  templateUrl: './create-film.component.html',
  styleUrls: ['./create-film.component.scss']
})
export class CreateFilmComponent implements OnInit {
  infoRequiredFormGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    isExpected: [false],
    publish: [false],
    file: new FormControl<File | null>(null),
    limitation: new FormControl<number | null>(null, [Validators.min(0), Validators.max(18)]),
    description: ['', [Validators.minLength(0), Validators.maxLength(2000)]],
    year: new FormControl<number | null>(null, [Validators.min(1895), Validators.max(new Date().getFullYear())]),
    genreNames: this._formBuilder.array([this.createGenreFormControl()])
  });
  sourcesFormGroup = this._formBuilder.group({
    trailer: ['', Validators.required],
    sources: this._formBuilder.array([this.createSourceFormControl()])
  });
  file: File | null = null;
  aspectRatio = '2:3';
  imageUrl: string | ArrayBuffer | null | undefined;
  genres: string[] = []
  filmIdForEdit: string | undefined;

  constructor(private _formBuilder: FormBuilder, private genreService: GenreService, private filmService: FilmService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.genreService.getGenreNamesList().subscribe(
      genres => this.genres = genres
    );

    this.filmIdForEdit = this.route.snapshot.params['filmId'];

    if (this.filmIdForEdit) {
      this.filmService.getFilm(this.filmIdForEdit).subscribe(
        film => {
          this.infoRequiredFormGroup.patchValue(film);
          this.infoRequiredFormGroup.controls['genreNames'].clear();
          film.genreNames.forEach(genre => (this.infoRequiredFormGroup.get('genreNames') as FormArray).push(this.createGenreFormControl(genre)));

          this.sourcesFormGroup.patchValue(film);
          this.sourcesFormGroup.controls['sources'].clear();
          film.sources.forEach(source => (this.sourcesFormGroup.get('sources') as FormArray).push(this.createSourceFormControl(source)));

          if (film.photoUrl)
            this.imageUrl = film.photoUrl;
        }
      )
    }
  }

  get isExpected(): boolean {
    return this.infoRequiredFormGroup.controls['isExpected'].value as boolean;
  }

  get possibleGenres(): string[] {
    const selectedGenres = this.infoRequiredFormGroup.controls['genreNames'].controls.map(g => g.value) as string[];
    return this.genres.filter(g => !selectedGenres.includes(g));
  }

  get possibleToAddGenre(): boolean {
    return this.genres.length !== this.infoRequiredFormGroup.controls['genreNames'].length
  }

  createGenreFormControl(genre: string | null = null): FormControl {
    const control = new FormControl('', [Validators.required]);
    if (genre) {
      control.setValue(genre);
    }

    return control
  }

  createSourceFormControl(source: string | null = null): FormControl {
    const control = new FormControl('', [Validators.required]);
    if (source) {
      control.setValue(source);
    }

    return control
  }

  addGenre() {
    const genresArray = this.infoRequiredFormGroup.get('genreNames') as FormArray;
    genresArray.push(this.createGenreFormControl());
  }

  removeGenre(index: number) {
    const genresArray = this.infoRequiredFormGroup.get('genreNames') as FormArray;
    genresArray.removeAt(index);
  }

  addSource() {
    const genresArray = this.sourcesFormGroup.get('sources') as FormArray;
    genresArray.push(this.createGenreFormControl());
  }

  removeSource(index: number) {
    const genresArray = this.sourcesFormGroup.get('sources') as FormArray;
    genresArray.removeAt(index);
  }

  handleFileInput(imageInput: any | null) {
    if (imageInput) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (this.isValidAspectRatio(img.width, img.height)) {
            this.imageUrl = e.target?.result;
            this.infoRequiredFormGroup.get('file')?.setValue(imageInput);
            this.file = imageInput.files[0];
          } else {
            alert('Please upload an image with a 2:3 aspect ratio.');
          }
        };
        img.src = URL.createObjectURL(imageInput);
      };
      reader.readAsDataURL(imageInput);
    }
  }

  private isValidAspectRatio(width: number, height: number): boolean {
    const expectedRatio = this.aspectRatio.split(':').map(Number);
    const actualRatio = [width, height].map(Number);
    return (actualRatio[0] / actualRatio[1]).toFixed(1) === (expectedRatio[0] / expectedRatio[1]).toFixed(1);
  }

  changedExpected() {
    const limitation = this.infoRequiredFormGroup.controls['limitation'];
    const year = this.infoRequiredFormGroup.controls['year'];
    const sources = this.sourcesFormGroup.controls['sources'];
    if (!this.isExpected) {
      limitation.enable();
      year.enable();
      sources.push(this.createSourceFormControl());
    }
    else {
      limitation.setValue(null);
      year.setValue(null);
      sources.clear();
      limitation.disable();
      year.disable();
    }
  }

  sendData() {
    const file = this.infoRequiredFormGroup.get('file')?.value
    if (this.filmIdForEdit) {
      const filmUpdateRequest: FilmUpdateRequest =
      {
        id: this.filmIdForEdit,
        name: this.infoRequiredFormGroup.get('name')?.value ?? "",
        year: this.infoRequiredFormGroup.get('year')?.value ?? 0,
        limitation: this.infoRequiredFormGroup.get('limitation')?.value ?? 0,
        description: this.infoRequiredFormGroup.get('description')?.value ?? "",
        file: file ?? null,
        isExpected: this.infoRequiredFormGroup.get('isExpected')?.value ?? false,
        publish: this.infoRequiredFormGroup.get('publish')?.value ?? false,
        genreNames: this.infoRequiredFormGroup.controls['genreNames'].getRawValue(),
        trailer: this.sourcesFormGroup.get('trailer')?.value ?? '',
        sourceNames: this.sourcesFormGroup.controls['sources'].getRawValue()
      }
      this.filmService.updateFilm(filmUpdateRequest).subscribe();
    }
    else {
      const filmAddRequest: FilmAddRequest =
      {
        name: this.infoRequiredFormGroup.get('name')?.value ?? "",
        year: this.infoRequiredFormGroup.get('year')?.value ?? 0,
        limitation: this.infoRequiredFormGroup.get('limitation')?.value ?? 0,
        description: this.infoRequiredFormGroup.get('description')?.value ?? null,
        file: file ?? null,
        isExpected: this.infoRequiredFormGroup.get('isExpected')?.value ?? false,
        publish: this.infoRequiredFormGroup.get('publish')?.value ?? false,
        genreNames: this.infoRequiredFormGroup.controls['genreNames'].getRawValue(),
        trailer: this.sourcesFormGroup.get('trailer')?.value ?? '',
        sourceNames: this.sourcesFormGroup.controls['sources'].getRawValue()
      }

      this.filmService.createFilm(filmAddRequest).subscribe();
    }

    this.router.navigate(['/']);
  }
}
