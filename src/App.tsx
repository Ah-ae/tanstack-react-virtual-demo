import { faker } from "@faker-js/faker";

const randomNumber = (min: number, max: number) =>
  faker.datatype.number({ min, max });

const sentences = new Array(100_000)
  .fill(true)
  .map(() => faker.lorem.sentence(randomNumber(20, 70)));

function App() {
  return (
    <div style={{ width: 400, height: 400, overflowY: "auto" }}>
      {sentences.map((sentence, index) => (
        <p>
          <span>{index + 1}. </span>
          {sentence}
        </p>
      ))}
    </div>
  );
}

export default App;
