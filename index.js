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
  .action(() => {
    list();
  });

program
  .command("edit")
  .description("Edit todo with id")
  .option("-t,--title <title>")
  .option("-i, --id <id>")
  .action(({ title, id }) => {
    edit(title, id);
  });

program
  .command("delete")
  .description("delete to-do with id")
  .arguments("<id>")
  .action(source => {
    Delete(source);
  });

const readFile = () => JSON.parse(fs.readFileSync("./db.json") || "[]");
const writeFile = todos => fs.writeFileSync("./db.json", JSON.stringify(todos));

const add = title => {
  //read array
  let todos = readFile();
  //push into array
  let id = todos.length + 1;
  todos.push({ id, title });
  //save
  writeFile(todos);
};

const list = () => {
  //read array
  let todos = readFile();
  console.table(todos);
};

const edit = (title, id) => {
  let todos = readFile();
  let todoEditedId = todos.findIndex(t => t.id == id);
  todos[todoEditedId] = { id, title };
  writeFile(todos);
};

const Delete = id => {
  console.log("id is", id);

  let todos = readFile();
  let todoId = todos.findIndex(t => t.id == id);
  console.log(todoId);

  todos.splice(todoId, 1);
  console.log(todos);

  writeFile(todos);
};

program.parse(process.argv);
