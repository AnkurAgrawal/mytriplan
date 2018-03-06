import { NgModule } from '@angular/core';
import { BeautifyStringPipe } from './../pipes/beautify-string/beautify-string';
import { ObjectKeysToArrayPipe } from './object-keys-to-array/object-keys-to-array';
import { ObjectValuesToArrayPipe } from './object-values-to-array/object-values-to-array';
import { IsTypePipe } from './is-type/is-type';

@NgModule({
	declarations: [BeautifyStringPipe,
    ObjectKeysToArrayPipe,
    ObjectValuesToArrayPipe,
    IsTypePipe],
	imports: [],
	exports: [BeautifyStringPipe,
    ObjectKeysToArrayPipe,
    ObjectValuesToArrayPipe,
    IsTypePipe]
})
export class PipesModule {}
