<template>
    <div>
        <b-input-group id='input-todo' label-for='todo' class='mb-3'>
            <b-input-group-prepend is-text>
                <div @click='setImportant()'>
                    <b-icon-star-fill v-if='todo.important'/>
                    <b-icon-star v-else/>
                </div>
            </b-input-group-prepend>
            <b-form-input
                id='todo'
                v-model.trim.lazy='todo.name'
                placeholder='Tarefa'
                type='text'
                @keyup.enter="saveTodo()"
            ></b-form-input>
            <b-input-group-append>
                <b-form-datepicker
                v-model='todo.endDate'
                button-only
                right
                locale='pt-BR'
                aria-controls='example-input'
                :min="getMinDate()"
                ></b-form-datepicker>
            </b-input-group-append>
            <b-input-group-append v-show='todo.endDate != ""'>
                <b-form-input
                id='end-date'
                v-model.trim.lazy='todo.endDate'
                type='date'
                ></b-form-input>
            </b-input-group-append>
        </b-input-group>
        <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="success"
        @dismiss-count-down="countDownChanged">
        Tarefa Inserida com Sucesso!
        </b-alert>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            todo: {
                name: '',
                endDate: '',
                important: false,
                concluded: false,
                conclusionDate: ''
            },

            dismissSecs: 2,

            dismissCountDown: 0
        }
    },

    methods: {
        ...mapActions(["addTodo"]),

        getMinDate() {
            const now = new Date()
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            return new Date(today)
        },

        setImportant() {
            this.todo.important = !this.todo.important
        },

        saveTodo() {
            if (this.todo.name != "") {
                let copy_todo = {
                    name: this.todo.name,
                    endDate: this.todo.endDate,
                    important: this.todo.important,
                    concluded: this.todo.concluded,
                    conclusionDate: this.todo.conclusionDate
                }
                this.addTodo(copy_todo);
                this.todo.name = ''
                this.todo.endDate = ''
                this.todo.important = false
                this.showAlert()
            }
        },

        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },

        showAlert() {
            this.dismissCountDown = this.dismissSecs
        }
    }
}
</script>

<style>
#end-date {
    width: 150px;
    text-align: center;
}
</style>