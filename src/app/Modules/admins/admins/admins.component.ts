import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../../Models/User/UserReponse';
import { UserService } from '../../../Core/services/user.service';
import { UserParams } from '../../../Core/helpers/userParams';
import { PaginatedParams } from '../../../Core/helpers/paginatedParams';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { UserDeepLinkingService } from '../../../Core/services/user-deep-linking.service';
import { NavigationService } from '../../../Core/services/navigation.service';
import { AuthorizationUseDeepLinkingService } from 'src/app/Core/services/authorization-use-deep-linking.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss', '../../../Shared/styles/items-list.scss']
})
export class AdminsComponent implements OnInit {
  paginatedAdmins: UserResponse[] | undefined;
  totalItems: number = 0;
  userParams: UserParams = new UserParams(10, 1);
  userDeepLinkingService: UserDeepLinkingService = new UserDeepLinkingService(this.route, this.router);
  authorizationUseDeepLinkingService: AuthorizationUseDeepLinkingService = new AuthorizationUseDeepLinkingService(this.router, this.route, this.urlSerializer)

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private navigationService: NavigationService, private urlSerializer: UrlSerializer) { }

  ngOnInit(): void {
    this.navigationService.setupPopstateListener(() => {
      this.navigationService.reloadPage();
    });

    this.userParams = this.userDeepLinkingService.getUserParams();

    this.userDeepLinkingService.setUserParams(this.userParams);
    this.fetchData(this.userParams as UserParams);
  }

  fetchData(pagedParams: PaginatedParams): void {
    const userParams = pagedParams as UserParams;

    this.userService.getAdmins(userParams).subscribe(
      (data) => {

        if (data) {
          this.paginatedAdmins = data.items ?? [];
          this.totalItems = data.totalCount ?? 0;
          this.userParams.pageNumber = data.currentPage ?? 1;
          this.userParams.pageSize = data.pageSize ?? 10;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createClicked() {
    this.authorizationUseDeepLinkingService.navigateToRegister(true);
  }

  onPaginationChange(pagedParams: PaginatedParams) {
    this.userParams.pageNumber = pagedParams.pageNumber;
    this.userParams.pageSize = pagedParams.pageSize;
    this.fetchData(this.userParams);
  }

  deleteAdmin(id: string) {
    this.userService.deleteAdmin(id).subscribe(
      _ => this.paginatedAdmins = this.paginatedAdmins?.filter(a => a.id != id)
    );
  }
}
