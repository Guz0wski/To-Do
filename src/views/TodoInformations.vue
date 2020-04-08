<template>
  <b-container>
    <h2>Detalhe da Tarefa:</h2>
    <b-alert
    :show="dismissCountDown"
    dismissible
    fade
    variant="success"
    @dismiss-count-down="countDownChanged">
    Tarefa Atualizada com Sucesso!
    </b-alert>
    <router-link
    tag="a"
    :to="{ name: 'home' }">
      <b-button id="btn-back" variant="info"><b-icon-arrow-left/></b-button>
    </router-link>
    <b-form>
      <b-row id='first-row' class="justify-content-md-center">
        <b-input-group prepend="Tarefa:" class="mt-5 w-75" >
          <b-form-input v-model="todo.name"></b-form-input>
        </b-input-group>
      </b-row>
      <b-row class="justify-content-md-center mt-2">
        <b-input-group prepend="Estimativa de Conclusão:" class="col-sm-5">
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
          <b-form-input type='date' v-model="todo.endDate"></b-form-input>
        </b-input-group>
      </b-row>
      <b-row class="justify-content-md-center mt-2">
        <b-input-group prepend="Data de Conclusão:" class="col-sm-5">
          <b-input-group-append>
            <b-form-datepicker
            @change="checkConcluded()"
            v-model='todo.conclusionDate'
            button-only
            right
            locale='pt-BR'
            aria-controls='example-input'
            :min="getMinDate()"
            ></b-form-datepicker>
          </b-input-group-append>
          <b-form-input type='date' @change="checkConcluded()" v-model="todo.conclusionDate"></b-form-input>
        </b-input-group>
      </b-row>
      <b-row class="justify-content-md-center mt-2">
        <b-input-group prepend="Importante:" class="col-sm-5 justify-content-md-end">
          <template v-slot:append>
            <b-button variant="warning" @click='setImportant()'>
              <b-icon-star-fill v-if='todo.important'/>
              <b-icon-star v-else/>
            </b-button>
          </template>
        </b-input-group>
        <b-input-group prepend="Concluído:" class="col-sm-5">
          <b-input-group-append>
            <b-button variant="success" @click='setConcluded()'>
              <b-icon-check-circle v-if='todo.concluded'/>
              <b-icon-circle v-else/>
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-row>
      <b-button class="mt-4" variant="info" @click="updateData()">Salvar</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
    name: 'todoInformations',

    data() {
      return { 
        id: this.$route.params.id,
        todo: {},
        dismissSecs: 2,
        dismissCountDown: 0
      }
    },

    computed: mapGetters(["todoById"]),

    created() {
      this.todo = this.todoById(this.id)
    },

    methods: {
      getMinDate() {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        return new Date(today)
      },

      ...mapActions(["updateTodo"]),

      updateData() {
        if (this.todo.name != '') {
          this.updateTodo(this.todo)
          this.showAlert()
        }
      },

      setImportant() {
        this.todo.important = !this.todo.important
      },

      getToday() {
        const now = new Date()
        const today = now.getFullYear() + '-' + ("0" + (now.getMonth() + 1)).slice(-2) + '-' + ("0" + now.getDate()).slice(-2)
        return today
      },

      setConcluded() {
        this.todo.concluded = !this.todo.concluded
        this.todo.conclusionDate = this.todo.concluded ? this.getToday().toString() : ''
      },

      countDownChanged(dismissCountDown) {
          this.dismissCountDown = dismissCountDown
      },

      showAlert() {
          this.dismissCountDown = this.dismissSecs
      },

      checkConcluded() {
        if (this.todo.conclusionDate == "") {
          this.todo.concluded = false
        } else {
          this.todo.concluded = true
        }
      }
    }
}
</script>

<style>
#btn-back {
  float: left;
}

#first-row {
  clear: both;
}
</style>