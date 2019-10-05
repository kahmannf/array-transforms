export interface Person {
  name: string
  street: string
  city: string
}

export const persons: Person[] = [
  {
    city: 'Berlin',
    street: 'Berliner Strasse',
    name: 'Johannes'
  },
  {
    city: 'Berlin',
    street: 'Berliner Strasse',
    name: 'Andreas'
  },
  {
    city: 'Berlin',
    street: 'Georgenstrasse',
    name: 'Julian'
  },
  {
    city: 'Dortmund',
    street: 'Reinoldistasse',
    name: 'Alexander'
  },
  {
    city: 'Dortmund',
    street: 'Ludwigstrasse',
    name: 'Anna'
  },
  {
    city: 'Bielefeld',
    street: 'Detmolder Strasse',
    name: 'Sarah'
  }
]
