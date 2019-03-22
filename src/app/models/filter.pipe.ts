import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

  transform(searchToken: string, items: any[]) {


        if (searchToken == null || searchToken == "")
        {
            searchToken = "";
        }

        return items.filter(elem => elem.indexOf(searchToken) > -1);
    }

}