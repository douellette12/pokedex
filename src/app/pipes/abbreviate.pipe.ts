import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviate',
  standalone: true
})
export class AbbreviatePipe implements PipeTransform {

  transform(value: string): string {
    if(value === 'hp') return 'HP'
    if(value === 'attack') return 'ATK'
    else if (value === 'defense') return 'DEF'
    else if (value === 'special-attack') return 'SpA'
    else if (value === 'special-defense') return 'SpD'
    else if (value === 'speed') return 'SPD'
    else return value
  }

}
