import { Template } from "meteor/templating";
import { SharedAB } from "./shared.js";
import { ReactiveDict } from "meteor/reactive-dict";

import { Tasks } from "../api/tasks.js";

import "./task.js";
import "./body.html";

let dolar = 0;

Template.body.helpers({
  tasks() {
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  dolar() {
    return localStorage.getItem("dolar");
  },
  total() {
    const tareas = SharedAB.get("tareas") || [];
    const dolar = localStorage.getItem("dolar");
    return (
      tareas
        .map((tarea) => tarea.cantidad * tarea.valor)
        .reduce((acc, curr) => acc + curr, 0) * dolar
    );
  },
});

Template.body.events({
  "change #dolar"(event, instance) {
    event.preventDefault();
    const inst = Template.instance();
    const dolar = event.target.value;
    localStorage.setItem("dolar", dolar);
    location.reload();
  },
  "click #limpiar"(event) {
    event.preventDefault();
    location.reload();
  },
  "submit .new-task"(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const concepto = target.text.value;
    const valor = target.valor.value;
    const text = target.text.value;

    // Insert a task into the collection
    Tasks.insert({
      text,
      concepto,
      valor,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.text.value = "";
    target.valor.value = 0;
  },
});
