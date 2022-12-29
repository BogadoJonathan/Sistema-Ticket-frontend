<template>

  <div class="formTicket">
    <h3 v-if="error">no se encontro el ticket</h3>
    <div class="col-12">
      <div class="input-group">
        <div class="input-group-text">Numero:</div>
        <input type="text" class="form-control" v-model="numero" />
        <button
            class="btn btn-secondary"
            @click="requestGetTicker"
          >
            buscar
          </button>
      </div>
    </div>

    
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      numero: null,
      error: false,
    };
  },
  methods: {
    requestGetTicker(){
        axios.get('tickets/'+this.numero).then(response => {
            console.log(response.data)
            console.log("get ticket ✔");
            this.error= false
          })
          .catch(errror => {
            console.log(errror)
            this.error= true
          })
    }
  },
  mounted() {},
};
</script>

<style scoped>
.formTicket{
  width: 30%;
  margin: auto;
  margin-top: 10px;
}
</style>