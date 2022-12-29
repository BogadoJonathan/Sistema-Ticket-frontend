<template>
    <div class="root">
        <teleport to="body">
            <div class="modalito" v-if="isModalOpen2" style="z-index=0">
                <div>
                    <button class="btn btn-danger botonCerrar" @click="isModalOpen2 = false; isModalOpen=true"><i class="bi bi-x-lg"></i></button>
                    <h3>vista previa del certificado</h3>
                    <div id="impresion">
                        <input class="p1 form-certificado-largo" type="text" v-model="matafuegoStore.matafuegoAImprimir.numeroMatafuego">
                        <input class="p2 form-certificado-corto" type="text" v-model="matafuegoStore.matafuegoAImprimir.anioFabricacion">
                        <p class="p3">{{matafuegoStore.matafuegoAImprimir.mes}}</p>
                        <p class="p4">{{matafuegoStore.matafuegoAImprimir.anioPH}}</p>
                        <p class="p5">{{matafuegoStore.matafuegoAImprimir.capacidad}}</p>
                        <p class="p6">{{getTipo(matafuegoStore.matafuegoAImprimir.tipo)}}</p>

                        <p class="p1a">Protect&nbsp;Persons</p>
                        <p class="p2a">028</p>
                        <p class="p3a">028</p>
                        <p class="p4a">{{matafuegoStore.matafuegoAImprimir.numeroMatafuego}}</p>
                        <p class="p5a">{{matafuegoStore.matafuegoAImprimir.mes}}</p>
                        <p class="p6a">{{matafuegoStore.matafuegoAImprimir.anioPH}}</p>

                        <p class="p1b">{{matafuegoStore.matafuegoAImprimir.mes}}</p>
                        <p class="p2b">{{matafuegoStore.matafuegoAImprimir.year}}</p>
                        <select class="select-certificado p3b" v-model.number="matafuegoStore.matafuegoAImprimir.idPropiedad">
                            <option 
                            v-for="(propiedad, i) in clientesStore.getAllPropiedadId(matafuegoStore.matafuegoAImprimir.idCliente)"
                            :key="i"
                            :value="propiedad.id"
                            >
                            {{ propiedad.typePropiedad == 2 ? "🏠" : "🚗" }}
                            {{ propiedad.data}}
                            </option>
                        
                        </select>
                        <button class="p3b2" @click="clientesStore.flagFormPropiedad = true">+</button>
                        <!-- <p class="p3b">{{getPropiedad(matafuegoStore.matafuegoAImprimir.idPropiedad)}}</p> -->
                        <input class="p4b form-certificado-corto" type="text" v-model="matafuegoStore.matafuegoAImprimir.mes">
                        <input class="p5b form-certificado-corto" type="text" v-model="matafuegoStore.matafuegoAImprimir.year">
                        <img class="certificadoImage" src="certificadoVerde.png" alt="" >

                        <!-- <button @click="imprimirAhora" style="margin-top:100px">imprimir</button> -->
                        <router-link :to="{ name: 'imprimir', query: getQuery()}" 
                        target="_blank" @click="imprimirAhora">
                          IMPRIMIR CERTIFICADO
                        </router-link>
                        
                    </div>
                    <CrearPropiedad :idCliente="matafuegoStore.matafuegoAImprimir.idCliente" v-if="clientesStore.flagFormPropiedad" style="margin-top: 7cm;"/>
                </div>  
            </div>

            <div class="modalito" v-if="isModalOpen">
                <div >
                    <button class="btn btn-danger botonCerrar" @click="isModalOpen = false"><i class="bi bi-x-lg"></i></button>
                    <h1 :style="ticketSelect.espera? 'color:green;':'color:blue'" >numero: {{ticketSelect.number}} - {{ticketSelect.espera? 'EN ESPERA' : 'NO ESPERA'}}</h1>
                    <h3>Cliente: {{clientesStore.dataOneCliente.razonSocial}} </h3>
                    <h3>DNI/CUIT: {{clientesStore.dataOneCliente.dni}}</h3>

                    <button @click="cambiarEspera()">cambiar espera</button>
                    <button @click="finalizarTicket()">ticket finalizado</button>

                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col">Tipo</th>
                            <th scope="col">capacidad</th>
                            <th scope="col">procesado</th>
                            <th scope="col">certificado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(matafuego, i) in listMatafuegoDeTicket" :key="i">
                                <td>{{getTipo(matafuego.tipo)}}</td>
                                <td>{{matafuego.capacidad}}</td>
                                <td>{{matafuego.procesado? '✅':'⏳'}}</td>
                                <td><button v-if="!matafuego.procesado" @click="imprimirCertificado(matafuego)">imprimir certificado</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>  
            </div>
        </teleport>
    </div>
        
    <button class="btn btn-dark" @click="flagFinalizado=!flagFinalizado"> {{flagFinalizado? "Ver Los NO Finalizados" : "Ver Finalizados"}}</button>

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
import CrearPropiedad from "@/components/CrearPropiedad.vue";

import { ref } from "vue";
import axios from "axios";

export default {
  components: {
    CrearPropiedad,
  },
  setup() {
    const ticketStore = useTicketStore();
    const clientesStore = useClientesStore();
    const matafuegoStore = useMatafuegoStore();

    const isModalOpen = ref(false);
    const isModalOpen2 = ref(false);

    return {
      ticketStore,
      isModalOpen,
      isModalOpen2,
      clientesStore,
      matafuegoStore,
    };
  },
  data() {
    return {
      flagFinalizado: false,
      ticketSelect: {
        clienteId: null,
        espera: false,
        finalizado: false,
        id: null,
        listMatafuegos: [],
        number: null,
      },
      listMatafuegoDeTicket: null,
    };
  },
  methods: {
    async openModal(ticket) {
      this.isModalOpen = true;
      this.ticketSelect = ticket;
      this.clientesStore.getOneClient(this.ticketSelect.clienteId);

      let params = {
        listado: this.ticketSelect.listMatafuegos.toString(),
      };

      let req = await axios.get("matafuegos/", { params });
      this.listMatafuegoDeTicket = req.data;
      console.log(this.clientesStore.dataOneCliente)
      this.clientesStore.getRequestPropiedad(this.clientesStore.dataOneCliente.id)
    },
    imprimirCertificado(matafuego) {
      this.isModalOpen2 = true;
      this.isModalOpen = false;
      this.matafuegoStore.matafuegoAImprimir = matafuego;
    },
    cambiarEspera() {
      this.ticketSelect.espera = !this.ticketSelect.espera;
      this.ticketStore.putRequestTicket(this.ticketSelect);
    },
    finalizarTicket() {
      this.ticketSelect.finalizado = !this.ticketSelect.finalizado;
      this.ticketStore.putRequestTicket(this.ticketSelect);
      this.isModalOpen = false;
    },
    getTipo(id) {
      return this.matafuegoStore.tiposMatafuegos.find(
        (element) => element.id == id
      ).title;
    },
    getPropiedad(id) {
      return this.clientesStore.list_propiedades.find(
        (element) => element.id == id
      )
    },
    ticketCompletado(){
      let finalizar = true
      this.listMatafuegoDeTicket.forEach(element => {
        if(element.procesado==false){
          finalizar=false
        }
      });
      if(finalizar){
          this.finalizarTicket()
        }
    },
    imprimirAhora(){
      // actualizamos el matafuego seleccionado
      let matafuegoAImprimir = this.matafuegoStore.matafuegoAImprimir
      this.listMatafuegoDeTicket.find(
        function(dato){
          if(dato.id == matafuegoAImprimir.id){
            dato.procesado = true
          }
        }
      );
      this.isModalOpen2 = false; 
      this.isModalOpen=true
      this.ticketCompletado()

      this.matafuegoStore.putRequestMatafuegoAImprimir()
    },
    getQuery(){
      
      let matafuego = this.matafuegoStore.matafuegoAImprimir
      let propiedad = this.getPropiedad(matafuego.idPropiedad)
      let otraInfo = {
        nameTipo : this.getTipo(matafuego.tipo),
        namePropiedad:propiedad.data,
        typePropiedad:propiedad.typePropiedad
      }
    
      return {...matafuego,...otraInfo}
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

.root {
  position: relative;
}

.modalito {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modalito > div {
  background-color: #fff;
  width: 70%;
  height: 80%;
  padding: 10px 50px;
  border-radius: 10px;
}

.botonCerrar {
  position: relative;
  left: 100%;
}

.certificadoImage{
    width: 14.3cm;
    height: 100%;
    margin-top: 1.2cm;
    margin-left: 1.9cm;
    opacity: 80%;
    z-index: 1;
}

.form-certificado-corto{
    width: 40px;
}

.form-certificado-largo{
    width: 70px;
}

.select-certificado{
    width: 150px !important;
    position: absolute;
    z-index: 10;
}

#impresion .p3b2{
    margin-top: 4.5cm;
    margin-left: 8.5cm;
    line-height : 15px;
    font-size: 15px;
    position: absolute;
    z-index: 10;
}

#impresion p{
font-weight: 900;
}
</style>