import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent {
  @Input({ required: true }) source: string | undefined;
  @Input({ required: true }) width: string = '';
  @Input({ required: true }) height: string = '';

  constructor(public sanitizer: DomSanitizer) { }
}
