<template>
  <ul class="nav">
    <li class="nav-item" v-if="!buscarTicket">
      <a
        @click="nuevaOrden"
        class="nav-link active"
        aria-current="page"
        href="#"
        v-html="textPage1"
      >
      </a>
    </li>

    <li class="nav-item" v-if="!newOrden">
      <a 
      @click="buscarTicketFuncion" 
      class="nav-link" 
      href="#"
      v-html="textPage2"
        ></a>
    </li>
    
    <li class="nav-item" v-if="!newOrden && !buscarTicket">
      <a class="nav-link" href="#"
        ><i class="bi bi-person-bounding-box"></i> Buscar Cliente</a
      >
    </li>
  </ul>
  <hr />

  <div v-if="newOrden">
    <NuevaOrden />
  </div>
  <div v-else-if="buscarTicket">
    <BuscarTicket />
  </div>
  <div v-else>
    <ListTicket />
  </div>
</template>

<script>
import NuevaOrden from "@/pages/NuevaOrden.vue";
import ListTicket from "@/components/ListTicket.vue";
import BuscarTicket from "@/pages/BuscarTicket.vue";
import { useMatafuegoStore } from "@/stores/matafuegos";
import { useClientesStore } from "@/stores/clientes";
import { useTicketStore } from "@/stores/ticket";
import axios from "axios";

export default {
  components: {
    NuevaOrden,
    ListTicket,
    BuscarTicket,
  },
  setup() {
    const matafuegoStore = useMatafuegoStore();
    const clientesStore = useClientesStore();
    const ticketStore = useTicketStore();

    return { matafuegoStore, clientesStore, ticketStore };
  },
  data() {
    return {
      newOrden: false,
      buscarTicket: false,
      textVolver: `<i class="bi bi-arrow-left"></i> Volver`,
      textPage1: `<i class="bi bi-card-list"></i> Nueva Orden`,
      textPage2: `<i class="bi bi-search"></i>  Buscar por N° de Ticket`,
    };
  },
  methods: {
    buscarTicketFuncion() {
      this.buscarTicket = !this.buscarTicket;
      if (this.buscarTicket) {
        this.textPage2 = this.textVolver;
      } else {
        this.textPage2 = `<i class="bi bi-search"></i>  Buscar por N° de Ticket`;
      }
    },
    nuevaOrden() {
      this.newOrden = !this.newOrden;
      if (this.newOrden) {
        this.textPage1 = this.textVolver;
      } else {
        this.textPage1 = `<i class="bi bi-card-list"></i> Nueva Orden`;
      }

      //this.fetchAllData();
    },
    fetchAllData() {
      const urlTipoMatafuego = "tipoMatafuegos/";

      this.clientesStore.getRequestCliente();
      this.ticketStore.getRequestTicket();

      //get tipoMatafuego
      axios
        .get(urlTipoMatafuego)
        .then((response) => {
          this.matafuegoStore.tiposMatafuegos = response.data;
          console.log("get tipos de matafuegos ✔");
        })
        .catch((errror) => {
          console.log(errror);
        });
    },
  },
  mounted() {
    this.fetchAllData();
  },
};
</script>

<style  scoped>
a {
  font-size: 20px;
  color: black;
}
</style>