import { NgModule } from '@angular/core';
import { BeautifyStringPipe } from './../pipes/beautify-string/beautify-string';
@NgModule({
	declarations: [BeautifyStringPipe],
	imports: [],
	exports: [BeautifyStringPipe]
})
export class PipesModule {}
