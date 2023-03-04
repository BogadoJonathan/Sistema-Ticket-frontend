<template>
    <ModelTicket v-if="isModalOpen" :conTicket="true" :ticketSelect="ticketSeleccionado" @cierre="cerrarModelYa"/>
    <!-- <button class="btn btn-dark" @click="flagFinalizado=!flagFinalizado"> {{flagFinalizado? "Ver Los NO Finalizados" : "Ver Finalizados"}}</button> -->

    <hr><p class="subtitulo">EN ESPERA</p>
    <div  class="listadoHorizontal" > 
        <div v-for="(ticket, i) in ticketStore.listTickets" :key="i">
            <div class="card text-bg-success  mb-3"
            v-if="ticket.finalizado==flagFinalizado && ticket.espera">
                <div class="card-body" >
                    <h2 class="card-title"><i class="bi bi-ticket"></i><br> {{ticket.number}} </h2>
                    <button class="btn btn-light" @click="openModal(ticket)">ver</button>
                </div>
            </div>
            
        </div>
    </div>

    <hr><p class="subtitulo">NO ESPERAN</p>
    <div  class="listadoHorizontal" > 
        <div v-for="(ticket, i) in ticketStore.listTickets" :key="i">
            <div class="card text-bg-warning  mb-3"
            v-if="ticket.finalizado==flagFinalizado && !ticket.espera">
                <div class="card-body" >
                    <h2 class="card-title"><i class="bi bi-ticket"></i><br> {{ticket.number}} </h2>
                    <button class="btn btn-light" @click="openModal(ticket)">ver</button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { useTicketStore } from "@/stores/ticket";
import { useClientesStore } from "@/stores/clientes";
import { useMatafuegoStore } from "@/stores/matafuegos";
import ModelTicket from "@/components/ModelTicket.vue"


export default {
  components: {
    ModelTicket
  },
  setup() {
    const ticketStore = useTicketStore();
    const clientesStore = useClientesStore();
    const matafuegoStore = useMatafuegoStore();

    return {
      ticketStore,
      clientesStore,
      matafuegoStore,
    };
  },
  data() {
    return {
      flagFinalizado: false,
      isModalOpen:false,
      ticketSeleccionado:null
    };
  },
  methods: {
    openModal(ticket) {
      this.ticketSeleccionado = ticket;
      this.isModalOpen = true;
    },
    cerrarModelYa(){
      this.isModalOpen = false;
    }
  },
};
</script>

<style scoped>
.subtitulo {
  text-align: left;
  margin-bottom: 0;
  margin-left: 30px;
  font-size: 25px;
}
.listadoHorizontal {
  display: flex;
  justify-content: flex-start;
  margin: 0px 20px 20px 20px;
}
.listadoHorizontal .card {
  margin: 10px;
  max-width: 200px;
}


</style>