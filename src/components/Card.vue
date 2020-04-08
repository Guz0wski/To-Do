<template>
  <b-card align='left' class="mb-1">
    <b-row>
        <b-col cols="auto d-flex align-items-center">
            <div class="h4" @click="setConcluded()">
                <b-icon-check-circle v-if='todo.concluded'/>
                <b-icon-circle v-else/>
            </div>
        </b-col>
        <b-col cols="auto d-flex align-items-center">
            <div class="h4" @click="setImportant()">
                <b-icon-star-fill v-if='todo.important'/>
                <b-icon-star v-else/>
            </div>
        </b-col>
        <b-col class="d-flex align-items-center">
            <label id="todo-name" class="text-truncate" :class="{ concluded: todo.concluded }">{{ todo.name }}</label>
        </b-col>
        <b-col cols="auto d-flex align-items-center" @click="deleteTodo(todo.id)">
            <b-icon-trash class="h4"/>
        </b-col>
        <b-col cols="auto d-flex align-items-center">
            <router-link
            :to="{ name: 'todoInformations', params: { id: todo.id } }"
            class="d-flex align-items-center">
                <b-icon-info-circle class="h4"/>
            </router-link>
        </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: 'cards',
    
    props: {
        todo: { 
            type: Object, 
            required: true 
        }
    },

    methods: {
        getToday() {
            const now = new Date()
            const today = now.getFullYear() + '-' + ("0" + (now.getMonth() + 1)).slice(-2) + '-' + ("0" + now.getDate()).slice(-2)
            return today
        },

        setConcluded() {
            this.todo.concluded = !this.todo.concluded
            this.todo.conclusionDate = this.todo.concluded ? this.getToday().toString() : ''
            this.updateTodo(this.todo)
        },

        setImportant() {
            this.todo.important = !this.todo.important
            this.updateTodo(this.todo)
        },

        ...mapActions(["deleteTodo", "updateTodo"]),
    }
}
</script>

<style>
.col-auto {
    padding: 0px 4px !important;
}

.card-body {
    padding: 8px;
}

.row {
    margin: 4px;
}

.h4, label, .h5 {
    margin: 0px !important;
}

.concluded {
    text-decoration: line-through;
}
</style>