import { Pipe, PipeTransform } from "@angular/core";
import { get } from 'object-path';

@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {
    transform<T>(array: Array<T>, path?: string): Array<T> {
        return array.sort((a: T, b: T) => {
            const aValue = path ? get(a as object, path) : a;
            const bValue = path ? get(b as object, path) : b;
            return bValue - aValue;
        })
    }
}
