import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchSkill: string): any[] {
    if(!items) return [];
    if(!searchSkill) return items;
    
    searchSkill = searchSkill.toLowerCase();
        return items.filter( it => {
          return it.name.toLowerCase().includes(searchSkill);
        });
   } 
}