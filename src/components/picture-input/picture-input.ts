import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { SanitizeStringPipe } from '../../pipes/sanitize-string/sanitize-string';
import { PhotoProvider } from '../../providers/providers';

/**
 * Generated class for the PictureInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mytriplan-picture',
  templateUrl: 'picture-input.html',
  providers: [
    SanitizeStringPipe
  ],
})
export class PictureInputComponent {
  @ViewChild('fileInput') fileInput;

  @Input('pictureUrl') pictureUrl?: string;
  @Output() success = new EventEmitter();

  constructor(private sanitizer: SanitizeStringPipe, private photoProvider: PhotoProvider) { }

  private getPicture() {
    this.photoProvider.getPicture().then(data => {
      data? this.returnPhoto(data): this.fileInput.nativeElement.click()
    });
  }

  private processWebPicture(event) {
    console.log('Processing web picture.');

    this.returnPhoto(event.target.files[0]);
  }

  private returnPhoto(file: File | string) {
    this.success.emit(file);
  }
}
