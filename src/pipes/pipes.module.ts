import { NgModule } from '@angular/core';
import { BeautifyStringPipe } from './../pipes/beautify-string/beautify-string';
import { ObjectKeysToArrayPipe } from './object-keys-to-array/object-keys-to-array';
import { ObjectValuesToArrayPipe } from './object-values-to-array/object-values-to-array';
import { IsTypePipe } from './is-type/is-type';
import { MomentPipe } from './moment/moment';
import { SanitizeStringPipe } from './sanitize-string/sanitize-string';

@NgModule({
	declarations: [BeautifyStringPipe,
    ObjectKeysToArrayPipe,
    ObjectValuesToArrayPipe,
    IsTypePipe,
    MomentPipe,
    SanitizeStringPipe],
	imports: [],
	exports: [BeautifyStringPipe,
    ObjectKeysToArrayPipe,
    ObjectValuesToArrayPipe,
    IsTypePipe,
    MomentPipe,
    SanitizeStringPipe]
})
export class PipesModule {}
