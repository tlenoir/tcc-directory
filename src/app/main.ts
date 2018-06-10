import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FilterPipe } from "../pipes/filter/filter";
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
