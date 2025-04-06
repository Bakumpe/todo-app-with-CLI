#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const Table = require('cli-table3');

// File path for storing tasks
const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Initialize tasks file if it doesn't exist
async function initializeTasksFile() {
    try {
        await fs.access(TASKS_FILE);
    } catch {
        await fs.writeFile(TASKS_FILE, JSON.stringify([]));
    }
}

// Read tasks from file
async function readTasks() {
    try {
        const data = await fs.readFile(TASKS_FILE, 'utf8');
        // Handle empty file case
        if (!data.trim()) return [];
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading tasks:', error.message);
        return [];
    }
}

// Write tasks to file
async function writeTasks(tasks) {
    try {
        await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error('Error writing tasks:', error.message);
    }
}

// Add a new task
async function addTask(description) {
    const tasks = await readTasks();
    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        description,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    await writeTasks(tasks);
    // Fixed chalk usage
    console.log(chalk.greenBright(`Task added successfully (ID: ${newTask.id})`));
}

// List all tasks
async function listTasks() {
    const tasks = await readTasks();
    if (tasks.length === 0) {
        console.log(chalk.yellowBright('No tasks found'));
        return;
    }

    const table = new Table({
        head: [
            chalk.cyanBright('ID'),
            chalk.cyanBright('Description'),
            chalk.cyanBright('Status'),
            chalk.cyanBright('Created At')
        ]
    });

    tasks.forEach(task => {
        table.push([
            task.id,
            task.description,
            task.status === 'completed' ? chalk.greenBright(task.status) : chalk.yellowBright(task.status),
            new Date(task.createdAt).toLocaleDateString()
        ]);
    });

    console.log(table.toString());
}

// Update task status
async function updateTask(id, status) {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    
    if (taskIndex === -1) {
        console.log(`Task with ID ${id} not found`);
        return;
    }

    tasks[taskIndex].status = status;
    await writeTasks(tasks);
    console.log(chalk.greenBright(`Task ${id} updated to ${status}`));
}

// Delete task
async function deleteTask(id) {
    const tasks = await readTasks();
    const filteredTasks = tasks.filter(task => task.id !== parseInt(id));  // Fixed typo
    
    if (tasks.length === filteredTasks.length) {
        console.log(`Task with ID ${id} not found`);
        return;
    }

    await writeTasks(filteredTasks);
    console.log(chalk.greenBright(`Task ${id} deleted successfully`));
}

// CLI command handler
async function main() {
    await initializeTasksFile();
    const [,, command, ...args] = process.argv;

    try {
        switch (command) {
            case 'add':
                if (!args[0]) throw new Error('Please provide a task description');
                await addTask(args.join(' '));
                break;

            case 'list':
                await listTasks();
                break;

            case 'update':
                if (!args[0] || !args[1]) throw new Error('Please provide task ID and status');
                await updateTask(args[0], args[1]);
                break;

            case 'delete':
                if (!args[0]) throw new Error('Please provide task ID');
                await deleteTask(args[0]);
                break;

            default:
                console.log(chalk.blueBright(`
Usage:
  todo add "task description"    - Add a new task
  todo list                     - List all tasks
  todo update <id> <status>     - Update task status (pending/completed)
  todo delete <id>              - Delete a task
                `));
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();