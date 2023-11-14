import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
  tab: number = 0;
  @Input({ required: true }) trailer: string = '';
  @Input({ required: true }) sources: string[] = [];

  constructor(public sanitizer: DomSanitizer) { }
}
