<template>
    <ModelTicket v-if="isModalOpen" :conTicket="true" :ticketSelect="ticketSeleccionado" @cierre="isModalOpen=false"/>
  <div class="formTicket">
    <h3 v-if="error">no se encontro el ticket</h3>
    <div class="col-12">
      <div class="input-group">
        <div class="input-group-text">Numero:</div>
        <input type="text" class="form-control" v-model="numero" />
        <button
            v-if="numero"
            class="btn btn-secondary ponerAtras"
            @click="requestGetTicker"
          >
            buscar
          </button>
      </div>
    </div>

    
  </div>
</template>

<script>
import ModelTicket from "@/components/ModelTicket.vue"
import axios from "axios";

export default {
  components: {ModelTicket},
  data() {
    return {
      numero: null,
      error: false,
      ticketSeleccionado:null,
      isModalOpen:false,
    };
  },
  methods: {
    requestGetTicker(){
        let params = {
            number:this.numero
        }
        axios.get('tickets/',{params}).then(response => {
            console.log("get ticket ✔");
            this.ticketSeleccionado=response.data
            if(this.ticketSeleccionado.length==0){
                this.error = true
            }
            else{
                this.ticketSeleccionado = this.ticketSeleccionado[0]
                this.error= false
                this.numero=null
                this.isModalOpen=true
            }
            
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