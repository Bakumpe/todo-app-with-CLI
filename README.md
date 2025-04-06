# Todo CLI

A simple command-line interface (CLI) tool for managing your todo list, built with Node.js. Tasks are stored persistently in a JSON file called (tasks.json).

## Features

- Add new tasks with descriptions
- List all tasks in a formatted table
- Update task status (pending/completed)
- Delete tasks by ID
- Color-coded output for better visibility
- Persistent storage in `tasks.json`

## Prerequisites

- [Node.js](https://nodejs.org/) (v20.0.0 or higher)

## Installation

1. Clone this repository or download the code:
```bash
git clone https://github.com/Bakumpe/todo-app-with-CLI
cd todo-cli
```

2. Install dependencies:
```bash
npm install
```

## Usage

Run the script using Node.js with the following commands:

```bash
todo <command> [arguments]
```

### Available Commands

| Command | Description | Example |
|---------|-------------|---------|
| `add "task description"` | Add a new task | `todo add "Buy groceries"` |
| `list` | List all tasks | `todo list` |
| `update <id> <status>` | Update task status | `todo update 1 completed` |
| `delete <id>` | Delete a task | `todo delete 1` |

### Example Output
```
$ node todo.js add "Finish project"
Task added successfully (ID: 1)

$ node todo.js list

│ ID │ Description     │ Status   │ Created At │
├────┼─────────────────┼──────────┼────────────┤
│ 1  │ Finish project  │ pending  │ 4/6/2025   │

$ node todo.js update 1 completed
Task 1 updated to completed
```

## Project Structure

- `todo.js`: Main script containing all functionality
- `tasks.json`: Auto-generated file for storing tasks (created on first run)
- `package.json`: Project metadata and dependencies

## Dependencies

- [chalk](https://www.npmjs.com/package/chalk) - Terminal string styling
- [cli-table3](https://www.npmjs.com/package/cli-table3) - Table formatting for CLI

## Development

To modify or extend the tool:

1. Install dependencies:
```bash
npm install
```

2. Make changes to `todo.js`

3. Test your changes:
```bash
node todo.js
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with Node.js

This README provides:
- Project overview and features
- Installation instructions
- Usage examples with a command table
- Development setup
- Contributing guidelines
- Dependencies and license information
