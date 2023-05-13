const button = document.querySelector("button");

button.addEventListener("click", promiseChain);

async function promiseAPI1() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch("https://dummyjson.com/posts");
  const data = await response.json();
  return data;
}

async function promiseAPI2() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data;
}

async function promiseAPI3() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await fetch("https://dummyjson.com/todos");
  const data = await response.json();
  return data;
}

async function promiseChain() {
  try {
    const result1 = await promiseAPI1();
    renderTableDataAPI1(result1);
    if (result1) {
      const result2 = await promiseAPI2();
      renderTableDataAPI2(result2);
      if (result2) {
        const result3 = await promiseAPI3();
        renderTableDataAPI3(result3);
        if (result3) {
          console.log("All Promises resolved successfully!");
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function renderTableDataAPI1(data) {
  const tbody = document.querySelector("#data-table1 tbody");
  tbody.innerHTML = data.posts
    .map(
      (item) => `
  <tr>
    <td id="api1-data">${item.id}</td>
    <td id="api1-data">${item.userId}</td>
    <td id="api1-data">${item.title}</td>
    <td id="api1-data">${item.body}</td>
    <td id="api1-data">${item.tags}</td>
    <td id="api1-data">${item.reactions}</td>
  </tr>
`
    )
    .join("");
}

function renderTableDataAPI2(data) {
  const tbody = document.querySelector("#data-table2 tbody");
  tbody.innerHTML = data.products
    .map(
      (item) => `
  <tr>
    <td id="api2-data">${item.id}</td>
    <td id="api2-data">${item.category}</td>
    <td id="api2-data">${item.brand}</td>
    <td id="api2-data">${item.title}</td>
    <td id="api2-data">${item.description}</td>
    <td id="api2-data">${item.price}</td>
    <td id="api2-data">${item.discountPercentage}</td>
    <td id="api2-data">${item.rating}</td>
    <td id="api2-data">${item.stock}</td>
    <td id="api2-data"><img src="${item.thumbnail}" alt="thumbnail" class="thumbnail"></td>
  </tr>
`
    )
    .join("");
}

function renderTableDataAPI3(data) {
  const tbody = document.querySelector("#data-table3 tbody");
  tbody.innerHTML = data.todos
    .map(
      (item) => `
  <tr>
    <td id="api3-data">${item.id}</td>
    <td id="api3-data">${item.userId}</td>
    <td id="api3-data">${item.todo}</td>
    <td id="api3-data">${item.completed}</td>
  </tr>
`
    )
    .join("");
}
