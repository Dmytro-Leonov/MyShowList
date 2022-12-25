export default function ShowPerson({people, name, name_plural}) {
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