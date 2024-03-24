import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { faker } from "@faker-js/faker";

const randomNumber = (min: number, max: number) =>
  faker.datatype.number({ min, max });

const sentences = new Array(100_000)
  .fill(true)
  .map(() => faker.lorem.sentence(randomNumber(20, 70)));

function App() {
  const parentElement = useRef(null);

  const virtualizer = useVirtualizer({
    count: sentences.length, // virtualize할 아이템 전체 개수
    getScrollElement: () => parentElement.current,
    estimateSize: () => 45, // estimated size of each item (unit: pixel, largest possible size in case of dynamic height)
  });

  const items = virtualizer.getVirtualItems(); // viewport에 보여지는 아이템

  return (
    <div
      ref={parentElement}
      style={{ width: 400, height: 400, overflowY: "auto" }}
    >
      {/* outer container */}
      <div
        style={{
          position: "relative",
          height: virtualizer.getTotalSize(),
          width: "100%",
        }}
      >
        {/* inner container */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${items[0]?.start}px)`,
          }}
        >
          {items.map((item) => (
            <p
              ref={virtualizer.measureElement}
              key={item.key}
              data-index={item.index}
            >
              <span>{item.index + 1}. </span>
              {sentences[item.index]}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
