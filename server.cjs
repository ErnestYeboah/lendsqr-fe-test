const { spawn } = require("node:child_process");

const port = process.env.PORT || "10000";

const server = spawn(
  "npx",
  ["json-server", "db.json", "--host", "0.0.0.0", "--port", port],
  {
    shell: true,
    stdio: "inherit",
  },
);

server.on("exit", (code) => {
  process.exit(code || 0);
});
