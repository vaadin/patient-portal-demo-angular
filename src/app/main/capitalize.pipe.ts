import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: any, args: any): any {
    if (value) {
      return value.replace(/_/, ' ').toString().split(' ').map(word => {
        return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
      }).join(' ');
    }
  }
}
