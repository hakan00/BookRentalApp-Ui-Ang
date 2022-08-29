import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookFilterHomePipe'
})
export class BookFilterHomePipe implements PipeTransform {

  transform(value: any[], filterText:string): any[] {
    if (!filterText) {
      return value;
    }

    return value.filter(p=> {
      const name = p.name.toLowerCase().includes(filterText.toLocaleLowerCase());
      const writer = p.writer.toLowerCase().includes(filterText.toLocaleLowerCase());
      return (name + writer)
    });
  }
}
