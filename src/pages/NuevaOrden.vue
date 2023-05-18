<template>
 
  <div v-if="ticketStore.ticketFinalizado">
    <h1>NUMERO: {{ticketStore.lastNumber}}</h1>
    <button class="btn btn-warning" @click="goToHome()">volver al home</button>
  </div>

  <div v-else>
    <h2>1 - ¿ESPERA EN LA SALA?</h2>
    <!-- seleccionamos si espera o no -->
    <div style="display:flex; justify-content:center;">
      
      <button type="button" :class="classEspera" @click="espera"><i class="bi bi-clipboard-check"></i> ESPERA</button>
      <button type="button" :class="classNoEspera" @click="noEspera"><i class="bi bi-clipboard-x"></i> NO ESPERA</button>
    </div>
    
  
    <div v-if="ticketStore.flagEspera != null">
      <!-- BUSCADOR DEL CLIENTE -->
      <hr>
      <h2>2 - BUSCA y SELECCIONA AL CLIENTE</h2>
      <BuscadorCliente v-if="clientesStore.flagBuscaCliente"/>
      
      <!-- MUESTRA MATAFUEGOS DE CLIENTE UNA VEZ SELECCIONADO -->
      <div v-if="!clientesStore.flagBuscaCliente">
        <hr>
        <div style="display:flex; justify-content:space-evenly; align-items:center">
          <h3><i class="bi bi-person-fill"></i> {{clientesStore.clienteSeleccionado.razonSocial}}</h3>
          <button  class="volverAElegir btn btn-dark" @click="volverABuscar()"><i class="bi bi-search"></i> re-buscar</button>
        </div>
        <hr>
        <h2>3 - SELECCIONA LOS O EL MATAFUEGO</h2>
          <SelectMatafuegos/>
      </div>
    </div>
  </div>
  

</template>

<script>
import BuscadorCliente from "@/components/BuscadorCliente.vue";
import SelectMatafuegos from "@/components/SelectMatafuegos.vue";
import { useClientesStore } from "@/stores/clientes";
import { useTicketStore } from '@/stores/ticket';
import { useMatafuegoStore } from "@/stores/matafuegos";

export default {
  components: {
    BuscadorCliente,
    SelectMatafuegos
  },
  setup() {
    const clientesStore = useClientesStore();
    const ticketStore = useTicketStore();
    const matafuegoStore = useMatafuegoStore();

    return { clientesStore, ticketStore, matafuegoStore }
  },
  data() {
    return {
      classNoEspera: 'btn btn-warning',
      classEspera: 'btn btn-success',
    };
  },
  methods: {
    goToHome(){
      window.location.reload();
    },
    espera() {
      this.classEspera = 'btn btn-success border border-3'
      this.ticketStore.flagEspera = true;
      this.classNoEspera = "btn btn-secondary "
    },
    noEspera() {
      this.classEspera = 'btn btn-secondary'
      this.ticketStore.flagEspera = false;
      this.classNoEspera = "btn btn-warning border border-3"
    },
    volverABuscar(){
      this.clientesStore.flagBuscaCliente=!this.clientesStore.flagBuscaCliente
      this.clientesStore.clienteSeleccionado = null
    }
  },
  mounted(){
    this.clientesStore.resetCliente()
    this.ticketStore.resetTicket()
  }
};
</script>

<style scoped>
button {
  padding: 30px;
  width: 200px;
  margin: 10px;
}

.volverAElegir{
  padding: 0px;
  width: 100px;
}

.border-3{
  border-color:black !important;
}

</style>