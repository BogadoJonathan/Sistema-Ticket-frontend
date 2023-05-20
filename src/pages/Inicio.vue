<template>
  <ul class="nav">
    <li class="nav-item" v-if="!buscarTicket && !configurar && !buscarCliente">
      <a
        @click="nuevaOrden"
        class="nav-link active"
        aria-current="page"
        href="#"
        v-html="textPage1"
      >
      </a>
    </li>

    <li class="nav-item" v-if="!newOrden && !configurar && !buscarCliente">
      <a 
      @click="buscarTicketFuncion" 
      class="nav-link" 
      href="#"
      v-html="textPage2"
        ></a>
    </li>
    
    <li class="nav-item" v-if="!newOrden && !buscarTicket && !configurar">
      <a
      @click="buscarClienteFuncion" 
      class="nav-link" 
      href="#"
      v-html="textPage4"
        ></a
      >
    </li>

    <li class="nav-item" v-if="!newOrden && !buscarTicket && !buscarCliente">
      <a 
      @click="configuracion" 
      class="nav-link" 
      href="#"
      v-html="textPage3"
        ></a>
    </li>
  </ul>
  <hr />

  <div v-if="newOrden">
    <NuevaOrden />
  </div>
  <div v-else-if="buscarTicket">
    <BuscarTicket />
  </div>
  <div v-else-if="buscarCliente">
    <BuscarCliente />
  </div>
  <div v-else-if="configurar">
    <Configuracion />
  </div>
  <div v-else>
    <ListTicket />
  </div>
</template>

<script>
import NuevaOrden from "@/pages/NuevaOrden.vue";
import ListTicket from "@/components/ListTicket.vue";
import BuscarTicket from "@/pages/BuscarTicket.vue";
import BuscarCliente from "@/pages/BuscarCliente.vue";
import Configuracion from "@/components/Configuracion.vue"
import { useMatafuegoStore } from "@/stores/matafuegos";
import { useClientesStore } from "@/stores/clientes";
import { useTicketStore } from "@/stores/ticket";
import {useCertificadoStore} from "@/stores/certificado"
import axios from "axios";

export default {
  components: {
    NuevaOrden,
    ListTicket,
    BuscarTicket,
    BuscarCliente,
    Configuracion
  },
  setup() {
    const matafuegoStore = useMatafuegoStore();
    const clientesStore = useClientesStore();
    const ticketStore = useTicketStore();
    const certificadoStore = useCertificadoStore();

    return { matafuegoStore, clientesStore, ticketStore, certificadoStore };
  },
  data() {
    return {
      newOrden: false,
      buscarTicket: false,
      buscarCliente: false,
      configurar: false,
      textVolver: `<i class="bi bi-arrow-left"></i> Volver`,
      textPage1: `<i class="bi bi-card-list"></i> Crear Ticket`,
      textPage2: `<i class="bi bi-search"></i>  Buscar por N° de Ticket`,
      textPage3: `<i class="bi bi-gear-fill"></i>  Alta Certificado`,
      textPage4: `<i class="bi bi-person-bounding-box"></i>  Buscar Cliente`
    };
  },
  methods: {
    buscarClienteFuncion() {
      this.buscarCliente = !this.buscarCliente;
      if (this.buscarCliente) {
        this.textPage4 = this.textVolver;
      } else {
        this.textPage4 = `<i class="bi bi-person-bounding-box"></i>  Buscar Cliente`;
      }
    },
    buscarTicketFuncion() {
      this.buscarTicket = !this.buscarTicket;
      if (this.buscarTicket) {
        this.textPage2 = this.textVolver;
      } else {
        this.textPage2 = `<i class="bi bi-search"></i>  Buscar por N° de Ticket`;
      }
    },
    configuracion() {
      this.configurar = !this.configurar;
      if (this.configurar) {
        this.textPage3 = this.textVolver;
      } else {
        this.textPage3 = `<i class="bi bi-gear-fill"></i>  Alta Certificado`;
      }
    },
    nuevaOrden() {
      this.newOrden = !this.newOrden;
      if (this.newOrden) {
        this.textPage1 = this.textVolver;
      } else {
        this.textPage1 = `<i class="bi bi-card-list"></i> Crear Ticket`;
      }

      //this.fetchAllData();
    },
    fetchAllData() {
      const urlTipoMatafuego = "tipoMatafuegos/";

      // this.clientesStore.getRequestCliente();
      this.ticketStore.getRequestTicket();
      this.certificadoStore.getRequestConfig();

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