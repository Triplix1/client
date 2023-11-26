import { Component, HostListener, OnInit } from '@angular/core';
import { GenreService } from '../../../Core/services/genre.service';
import { GenreResponse } from '../../../Models/Genre/genreResponse';
import { PaginatedResult } from '../../../Core/helpers/pagination';
import { GenreParams } from '../../../Core/helpers/genreParams';
import { NavigationService } from '../../../Core/services/navigation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreDeepLinkingService } from '../../../Core/services/genre-deep-linking.service';
import { PaginatedParams } from '../../../Core/helpers/paginatedParams';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss', '../../../Shared/styles/items-list.scss']
})
export class GenresComponent implements OnInit {
  pagiantedGenres: GenreResponse[] | undefined;
  genreParams: GenreParams = new GenreParams(5, 1);
  genreDeepLinkingService: GenreDeepLinkingService = new GenreDeepLinkingService(this.route, this.router);
  totalItems: number = 0;
  genreEditingId: string | undefined;
  createMode: boolean = false;
  genreForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
  })

  genreEditForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
  })

  constructor(private genreService: GenreService, private navigationService: NavigationService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.navigationService.setupPopstateListener(() => {
      this.navigationService.reloadPage();
    });

    this.genreParams = this.genreDeepLinkingService.getGenreParams();

    this.genreDeepLinkingService.setGenreParams(this.genreParams);
    this.fetchData(this.genreParams as GenreParams);
  }

  fetchData(pagedParams: PaginatedParams): void {
    const genreParams = pagedParams as GenreParams;

    this.genreService.getGenres(genreParams).subscribe(
      (data) => {

        if (data) {
          this.pagiantedGenres = data.items ?? [];
          this.totalItems = data.totalCount ?? 0;
          this.genreParams.pageNumber = data.currentPage ?? 1;
          this.genreParams.pageSize = data.pageSize ?? 10;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onPaginationChange(pagedParams: PaginatedParams): void {
    this.genreParams.pageNumber = pagedParams.pageNumber;
    this.genreParams.pageSize = pagedParams.pageSize;
    this.fetchData(this.genreParams);
  }

  editGenre(genre: GenreResponse) {
    const name = this.genreEditForm.get('name')?.value;
    if (this.genreEditForm.valid && name) {
      this.genreService.editGenre({ id: genre.id, name: name }).subscribe(
        response => genre.name = response.name
      );
      this.genreEditingId = undefined;
    }

  }

  cancelEditingMode() {
    this.genreEditingId = undefined;
  }

  setEditMode(genreId: string) {
    const genre = this.pagiantedGenres?.find(g => g.id === genreId)
    if (genre) {
      this.genreEditingId = genreId;
      this.genreEditForm.controls['name'].setValue(genre.name);
    }
  }
  deleteGenre(genreId: string) {
    this.genreService.deleteGenre(genreId).subscribe(
      _ => {
        this.pagiantedGenres = this.pagiantedGenres?.filter(genre => genre.id !== genreId);
      }
    );
  }

  onCreateClick() {
    this.createMode = !this.createMode;
  }

  getFormControl(controlName: string) {
    return this.genreForm.get(controlName) as FormControl;
  }

  publishGenre() {
    const name = this.genreForm.get('name')?.value;
    if (name) {
      this.genreService.createGenre({ name: name }).subscribe(
        response => {
          this.pagiantedGenres = [response, ...this.pagiantedGenres ?? []];
          this.genreForm.get('name')?.setValue("");
          this.createMode = false;
        }
      )
    }

  }
}
