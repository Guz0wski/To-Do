<template>
  <b-container>
      <Header />
      <b-card-group class="justify-content-md-center">
          <div class="w-75">
            <Card v-for="todo in allTodos" :key="todo.id" :todo='todo'/>
          </div>
      </b-card-group>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Header from '../components/Header';
import Card from '../components/Card'

export default {
    name: 'home',

    components: { 
        Header, 
        Card 
    },

    methods: {
        ...mapActions(["getTodos"]),
    },

    computed: mapGetters(["allTodos"]),

    created() {
        this.getTodos();
    }
}
</script>

<style>
body {
    margin: 16px;
}
</style>