import {Pipe, PipeTransform} from "@angular/core";
import linkifyStr from 'linkifyjs/lib/linkify-string';

@Pipe({name:'linkify'})
export class LinkifyPipe implements PipeTransform{
  transform(str: string): string{
    console.log(str,"-------");
    return str ? linkifyStr(str, {target:'_system'}) : str;
  }
}
