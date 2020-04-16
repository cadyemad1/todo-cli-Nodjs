const { program } = require("commander");
const fs = require("fs");

program
  .command("add")
  .description("add a new to-do")
  .option("-t,--title <title>")
  .action(({ title }) => {
    add(title);
  });

program
  .command("list")
  .description("list all to-dos")
  .option("-s, --status <status>")
  .action(({ status }) => {
    list(status);
  });

program
  .command("edit")
  .description("Edit todo with id")
  .option("-t,--title <title>")
  .option("-s,--status <status>")
  .option("-i, --id <id>")
  .action(({ title, id, status }) => {
    edit(title, id, status);
  });

program
  .command("delete")
  .description("delete to-do with id")
  .arguments("<id>")
  .action(source => {
    Delete(source);
  });

const statusValue = ["todo", "progress", "done"];
const readFile = () => JSON.parse(fs.readFileSync("./db.json", "utf8") || "[]");
const writeFile = todos => fs.writeFileSync("./db.json", JSON.stringify(todos));

const add = title => {
  //read array
  let todos = readFile();
  //push into array
  let id = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;
  todos.push({ id, title, status: "todo" });
  //save
  writeFile(todos);
};

const list = status => {
  //read array
  let todos = readFile();
  if (status) {
    let filteredTodos = todos.filter(t => t.status === status);
    console.table(filteredTodos);
  } else console.table(todos);
};

const edit = (title, id, status) => {
  let todos = readFile();
  let todoEditedId = todos.findIndex(t => t.id == id);
  let statusCorrect;

  if (status !== undefined)
    statusCorrect = statusValue.includes(status.toLowerCase());

  title ? (todos[todoEditedId] = { ...todos[todoEditedId], title }) : "";

  statusCorrect
    ? (todos[todoEditedId] = {
        ...todos[todoEditedId],
        status: status.toLowerCase()
      })
    : "";

  writeFile(todos);
};

const Delete = id => {
  let todos = readFile();

  let todoId = todos.findIndex(t => t.id == id);

  todos.splice(todoId, 1);

  writeFile(todos);
};

program.parse(process.argv);
