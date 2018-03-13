import { NgModule } from '@angular/core';
import { BeautifyStringPipe } from './../pipes/beautify-string/beautify-string';
import { ObjectKeysToArrayPipe } from './object-keys-to-array/object-keys-to-array';
import { ObjectValuesToArrayPipe } from './object-values-to-array/object-values-to-array';
import { IsTypePipe } from './is-type/is-type';
import { MomentPipe } from './moment/moment';

@NgModule({
	declarations: [BeautifyStringPipe,
    ObjectKeysToArrayPipe,
    ObjectValuesToArrayPipe,
    IsTypePipe,
    MomentPipe],
	imports: [],
	exports: [BeautifyStringPipe,
    ObjectKeysToArrayPipe,
    ObjectValuesToArrayPipe,
    IsTypePipe,
    MomentPipe]
})
export class PipesModule {}
