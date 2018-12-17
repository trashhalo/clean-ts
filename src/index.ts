import "./styles.css";

import { PersistenceAdaptor } from "./adaptors";
import { IncrementUseCase, LoadUseCase } from "./domain";

const persistence = new PersistenceAdaptor();
const incrementUseCase = new IncrementUseCase(persistence);
const loadUseCase = new LoadUseCase(persistence);

async function main() {
  let c = await loadUseCase.execute();
  const val = document.getElementById("val");
  const inc = document.getElementById("inc");

  if (!(val && inc)) {
    return;
  }

  const render = async () => {
    val.innerText = c.value + '';
  }

  const increment = async () => {
    c = await incrementUseCase.execute(c);
    render();
  }

  if (inc) {
    inc.onclick = async () => {
      await increment();
    };
  }
  render();
}
main();
