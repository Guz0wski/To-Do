<template>
  <b-form>
      <b-input-group id='input-task' label-for='task' class='mb-3'>
        <b-input-group-prepend is-text>
            <div @click='setImportantStar()'>
                <b-icon-star-fill v-if='task.important'/>
                <b-icon-star v-else/>
            </div>
        </b-input-group-prepend>
        <b-form-input
          id='task'
          v-model.trim.lazy='task.name'
          placeholder='Terefa'
          type='text'
          required
        ></b-form-input>
        <b-input-group-append>
            <b-form-datepicker
            v-model='task.endDate'
            button-only
            right
            locale='pt-BR'
            aria-controls='example-input'
            :min="getMinDate()"
            ></b-form-datepicker>
      </b-input-group-append>
      <b-input-group-append v-show='task.endDate != ""'>
          <b-form-input
          id='end-date'
          v-model.trim.lazy='task.endDate'
          type='date'
          ></b-form-input>
      </b-input-group-append>
      </b-input-group>
  </b-form>
</template>

<script>
export default {
    data() {
        return {
            task: {
                name: '',
                endDate: '',
                important: false
            }
        }
    },

    methods: {
        getMinDate() {
            const now = new Date()
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            return new Date(today)
        },

        setImportantStar() {
            this.task.important = !this.task.important
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