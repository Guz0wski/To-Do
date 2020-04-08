import axios from "axios";

const state = {
  todos: []
}

const getters = {
    allTodos: state => state.todos,
    todoById: (state) => (id) => (state.todos.filter(elem => elem.id == id))[0]
}

const actions = {
    getTodos({ commit }) {
      state.todos = []
      axios.get('https://to-do-9f3d9.firebaseio.com/todos.json')
      .then((resp) => {
          commit('getTodo', resp.data)
      })
    },

    addTodo({ commit }, new_todo) {
      axios.post('https://to-do-9f3d9.firebaseio.com/todos.json', new_todo)
      .then((resp) => {
        let copy_todo = {
          id: resp.data.name,
          name: new_todo.name,
          endDate: new_todo.endDate,
          important: new_todo.important,
          concluded: new_todo.concluded,
          conclusionDate: new_todo.conclusionDate
        }
        commit('addTodo', copy_todo)
      })
    },

    deleteTodo({ commit }, id) {
      axios.delete('https://to-do-9f3d9.firebaseio.com/todos/' + id + '.json')
      .then(() => {
        commit("deleteTodo", id);
      })
    },

    updateTodo({ commit }, upd_todo) {
      let copy_todo = {
        name: upd_todo.name,
        endDate: upd_todo.endDate,
        important: upd_todo.important,
        concluded: upd_todo.concluded,
        conclusionDate: upd_todo.conclusionDate
      }

      axios.patch('https://to-do-9f3d9.firebaseio.com/todos/' + upd_todo.id + '.json', copy_todo)
      .then(() => {
        commit("updateTodo", upd_todo);
      })
    }
}

const mutations = {
    getTodo: (state, todos) => {
      for (let todo in todos) { 
        state.todos.push({ id: todo, ...todos[todo] }) 
      }
    },

    addTodo: (state, todo) => state.todos.push(todo),

    deleteTodo: (state, id) => (state.todos = state.todos.filter(t => t.id != id)),

    updateTodo: (state, upd_todo) => {
      let index = state.todos.findIndex(elem => elem.id == upd_todo.id)

      if (index !== -1) {
        state.todos.splice(index, 1, upd_todo);
      }
    }
}

export default {
  state,
  actions,
  getters,
  mutations
};