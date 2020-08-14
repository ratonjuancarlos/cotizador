import { Template } from "meteor/templating";
import { SharedAB } from "./shared.js";
import { Tasks } from "../api/tasks.js";

import "./task.html";

Template.task.events({
  "click .delete"() {
    const confirmDelete = confirm(`Seguro que queres borrar ${this.text}`);
    if (confirmDelete) {
      Tasks.remove(this._id);
    }
  },
  "change .cantidad"(event, instance) {
    const previousTareas = SharedAB.get("tareas") || [];
    const newTareas = previousTareas.concat({
      tarea: this.text,
      valor: this.valor,
      cantidad: $(event.target).val(),
    });
    SharedAB.set("tareas", newTareas);
  },
});
