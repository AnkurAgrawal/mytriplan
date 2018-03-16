import { Validators } from '@angular/forms';

export interface FormValidators {

  validators(): { [key: string]: Validators };
}