import { Person } from '../api/types';

type ShowPeopleProps = {
  people: Person[],
  name: string
  name_plural: string
}

export default function ShowPerson({ people, name, name_plural }: ShowPeopleProps) {
  return (
    <>
      {
        people.length !== 0 &&
          <>
            <div>{people.length > 1 ? name_plural : name}:</div>
            <p>
              {
                people.map((person) => {
                  return (
                    person.name
                  )
                }).join(', ')
              }
            </p>
          </>
      }
    </>
  )
}