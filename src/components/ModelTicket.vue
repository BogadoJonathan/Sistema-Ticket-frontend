<template>
<h1>EEYY</h1>
  <div class="root" v-if="isModalOpen">
    <teleport to="body">
      <div class="modalito" v-if="isModalOpen2 || !conTicket  " style="z-index=0">
        <div v-if="!imprimir">
          <button
            class="btn btn-danger botonCerrar"
            @click="isModalOpen2 = false"
            v-if="conTicket"
          >
            <i class="bi bi-x-lg"></i>
          </button>

          <button
          class="btn btn-danger botonCerrar"
            @click="cerrarModel"
            v-else>
             <i class="bi bi-x-lg"></i>
            </button>

          <h3>vista previa del certificado</h3>
          <div class="divDestacado">
            N° extintor
            <input
              class="form-certificado-largo"
              type="text"
              v-model="matafuegoStore.matafuegoAImprimir.numeroMatafuego"
            />&nbsp;&nbsp; Año de fabricación
            <input
              class="form-certificado-corto"
              type="text"
              v-model="matafuegoStore.matafuegoAImprimir.anioFabricacion"
            />&nbsp;&nbsp; Año PH
            <input
              v-if="matafuegoStore.matafuegoAImprimir.anioPH"
              class="form-certificado-corto"
              type="text"
              v-model="matafuegoStore.matafuegoAImprimir.anioPH"
            />&nbsp;&nbsp;
            <input
              v-else
              class="form-certificado-corto"
              type="text"
              v-model="anioPH"
            />&nbsp;&nbsp; Proxima revisión
            <input
              class="form-certificado-corto"
              type="text"
              v-model="matafuegoStore.matafuegoAImprimir.mes"
            />
            <input
              class="form-certificado-corto"
              type="text"
              v-model="matafuegoStore.matafuegoAImprimir.year"
            />
          </div>

          <div id="impresion">
            <p class="p1">
              {{ matafuegoStore.matafuegoAImprimir.numeroMatafuego }}
            </p>
            <p class="p2">
              {{ matafuegoStore.matafuegoAImprimir.anioFabricacion }}
            </p>

            <p class="p3">{{ matafuegoStore.matafuegoAImprimir.mes }}</p>
            <p class="p4">
              {{
                matafuegoStore.matafuegoAImprimir.anioPH
                  ? matafuegoStore.matafuegoAImprimir.anioPH
                      .toString()
                      .slice(-2)
                  : ""
              }}
            </p>
            <p class="p5">{{ matafuegoStore.matafuegoAImprimir.capacidad }}</p>
            <p class="p6">
              {{ getTipo(matafuegoStore.matafuegoAImprimir.tipo) }}
            </p>

            <p class="p1a">Protect&nbsp;Persons</p>
            <p class="p2a">028</p>
            <p class="p3a">028</p>
            <p class="p4a">
              {{ matafuegoStore.matafuegoAImprimir.numeroMatafuego }}
            </p>
            <p class="p5a">{{ matafuegoStore.matafuegoAImprimir.mes }}</p>
            <p class="p6a">{{ sacarAnioPH() }}</p>

            <p class="p1b">{{ matafuegoStore.matafuegoAImprimir.mes }}</p>
            <p class="p2b">{{ matafuegoStore.matafuegoAImprimir.year }}</p>
            <select
              class="select-certificado p3b"
              v-model.number="matafuegoStore.matafuegoAImprimir.idPropiedad"
            >
              <option
                v-for="(propiedad, i) in clientesStore.getAllPropiedadId(
                  matafuegoStore.matafuegoAImprimir.idCliente
                )"
                :key="i"
                :value="propiedad.id"
              >
                {{ propiedad.typePropiedad == 2 ? "🏠" : "🚗" }}
                {{ propiedad.data }}
              </option>
            </select>
            <button
              class="p3b2"
              @click="clientesStore.flagFormPropiedad = true"
            >
              +
            </button>
            <p class="p4b">{{ matafuegoStore.matafuegoAImprimir.mes }}</p>
            <p class="p5b">{{ matafuegoStore.matafuegoAImprimir.year }}</p>

            <img class="certificadoImage" src="certificadoVerde.png" alt="" />

            <button class="btn btn-dark" @click="checkNumber">IMPRIMIR CERTIFICADO</button>
            <!-- <router-link
              :to="{ name: 'imprimir', query: getQuery() }"
              target="_blank"
              @click="checkNumber"
              class="btn btn-dark"
            >
              IMPRIMIR CERTIFICADO
            </router-link> -->
          </div>
          
          <CrearPropiedad
            :idCliente="matafuegoStore.matafuegoAImprimir.idCliente"
            v-if="clientesStore.flagFormPropiedad"
            style="margin-top: 7cm"
          />
        </div>
        <div v-else>
          <h1>verificar numero de certificado</h1>
          <div class="divDestacado" style="padding: 50px; display: flex; justify-content: center;">
            N° certificado
            <input 
              class="form-certificado-corto"
              type="text"
              v-model="serieCertificado"
            />
            <input
              class="form-certificado-largo"
              type="text"
              v-model="numeroCertificado"
            />
          </div>
          <div class="card-body d-flex justify-content-between align-items-center">
            <button class="btn btn-warning" @click="imprimir = false" style="margin-top: 10px"> editar datos</button>
            <router-link
              style="margin-top: 10px; "
              :to="{ name: 'imprimir', query: getQuery() }"
              target="_blank"
              @click="imprimirAhora"
              class="btn btn-success"
            >
              imprimir
            </router-link>

          </div>
          

        </div>
      </div>

      <div class="modalito" v-if="!isModalOpen2 && conTicket">
        <div>
          <button class="btn btn-danger botonCerrar" @click="cerrarModel">
            <i class="bi bi-x-lg"></i>
          </button>
          <h1 :style="ticketSelect.espera ? 'color:green;' : 'color:blue'">
            numero: {{ ticketSelect.number }} -
            {{ ticketSelect.espera ? "EN ESPERA" : "NO ESPERA" }}
          </h1>
          <h3>Cliente: {{ clientesStore.dataOneCliente.razonSocial }}</h3>
          <h3>DNI/CUIT: {{ clientesStore.dataOneCliente.dni }}</h3>

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
                <td>{{ getTipo(matafuego.tipo) }}</td>
                <td>{{ matafuego.capacidad }}</td>
                <td>{{ matafuego.procesado ? "✅" : "⏳" }}</td>
                <td>
                  <button
                    v-if="!matafuego.procesado"
                    @click="imprimirCertificado(matafuego)"
                  >
                    certificar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { useTicketStore } from "@/stores/ticket";
import { useClientesStore } from "@/stores/clientes";
import { useMatafuegoStore } from "@/stores/matafuegos";
import { useCertificadoStore } from "@/stores/certificado";

import CrearPropiedad from "@/components/CrearPropiedad.vue";

import { ref, vModelSelect } from "vue";
import axios from "axios";

export default {
  props: {
    ticketSelect: {
      required: false,
    },
    conTicket: {
      type: [Boolean],
      required: true,
    },
  },
  components: {
    CrearPropiedad,
  },
  setup() {
    const ticketStore = useTicketStore();
    const clientesStore = useClientesStore();
    const matafuegoStore = useMatafuegoStore();
    const certificadoStore = useCertificadoStore();

    const isModalOpen2 = ref(false);

    return {
      certificadoStore,
      ticketStore,
      isModalOpen2,
      clientesStore,
      matafuegoStore,
    };
  },
  data() {
    return {
      imprimir: false,
      flagFinalizado: false,
      listMatafuegoDeTicket: [],
      isModalOpen: false,
      anioPH: null,
      serieCertificado: null,
      numeroCertificado: null,
    };
  },
  methods: {
    async iniciarModel() {
      if(this.conTicket){
        //obtiene el cliente del ticket
        await this.clientesStore.getOneClient(this.ticketSelect.clienteId);
        //obtenemos los matafuegos del ticket
        let params = {
          listado: this.ticketSelect.listMatafuegos.toString(),
        };
        let req = await axios.get("matafuegos/", { params });
        this.listMatafuegoDeTicket = req.data;
        //obtenemos las propiedades del cliente
        this.clientesStore.getRequestPropiedad(
          this.clientesStore.dataOneCliente.id
        );
      }
      
      //abrimos el modal
      this.isModalOpen = true;
    },
    cambiarEspera() {
      this.ticketSelect.espera = !this.ticketSelect.espera;
      this.ticketStore.putRequestTicket(this.ticketSelect);
    },
    finalizarTicket() {
      this.ticketSelect.finalizado = !this.ticketSelect.finalizado;
      this.ticketStore.putRequestTicket(this.ticketSelect);
      this.cerrarModel();
    },
    getTipo(id) {
      return this.matafuegoStore.tiposMatafuegos.find(
        (element) => element.id == id
      ).title;
    },
    getPH(id) {
      return this.matafuegoStore.tiposMatafuegos.find(
        (element) => element.id == id
      ).ph;
    },
    sacarAnioPH() {
      let matafuego = this.matafuegoStore.matafuegoAImprimir;
      let today = new Date();
      let year = today.getFullYear();
      let ph = this.getPH(matafuego.tipo); //año acumulativo de PH segun el tipo

      //si ya tiene año de PH
      if (matafuego.anioPH) {
        let anioPH = parseInt(matafuego.anioPH);
        if (anioPH <= year) {
          year += ph;
          this.anioPH = year;
          return year.toString().slice(-2);
        }
        this.anioPH = anioPH;
        return anioPH.toString().slice(-2);
      }
      //Si no tiene año de PH
      else {
        //vemos si hay año de fabricacion y si tiene 4 digitos
        if (
          !matafuego.anioFabricacion ||
          matafuego.anioFabricacion.length < 4
        ) {
          return "";
        }

        let nuevoPH = parseInt(matafuego.anioFabricacion);

        do {
          nuevoPH += ph;
        } while (nuevoPH <= year);
        this.anioPH = nuevoPH;
        return nuevoPH.toString().slice(-2);
      }
    },
    obtenerDatosCertificados(){

      certificadoStore.numerosCertificados
    },
    imprimirCertificado(matafuego) {
      this.isModalOpen2 = true;
      this.matafuegoStore.matafuegoAImprimir = matafuego;

      let today = new Date();
      let year = today.getFullYear() + 1;
      let month = today.getMonth() + 1;
      month = month.toString();
      year = year.toString();
      console.log(year);
      this.matafuegoStore.matafuegoAImprimir.mes =
        month.length == 1 ? "0" + month : month;
      this.matafuegoStore.matafuegoAImprimir.year = year.slice(-2);
    },
    checkNumber(){
      this.imprimir = true
      let idPropiedad = this.matafuegoStore.matafuegoAImprimir.idPropiedad
      let typePropiedad = this.clientesStore.getTipoPropiedad(idPropiedad)
      let capacidad = this.matafuegoStore.matafuegoAImprimir.capacidad

      console.log(typePropiedad)
      //si es auto
      if(typePropiedad==1){ 
        //con capacidad 1 es el certificaod azul
        if(capacidad=='1'){
          this.serieCertificado = this.certificadoStore.numerosCertificados.last_serie_certificate_blue
          this.numeroCertificado = this.certificadoStore.numerosCertificados.last_number_certificate_blue
          this.nameVariable = '3'
        }
        else{
          this.serieCertificado = this.certificadoStore.numerosCertificados.last_serie_certificate_pink
          this.numeroCertificado = this.certificadoStore.numerosCertificados.last_number_certificate_pink
          this.nameVariable = '1'
        } 
      }
      else{
        this.serieCertificado = this.certificadoStore.numerosCertificados.last_serie_certificate_green
        this.numeroCertificado = this.certificadoStore.numerosCertificados.last_number_certificate_green
        this.nameVariable = '2' 
      }

      this.numeroCertificado = parseInt(this.numeroCertificado)+2
      this.numeroCertificado = this.numeroCertificado.toString()

    },
    certificarEsto(){
      let name
      if(this.nameVariable == '1'){
        name = 'certificate_pink'
      }
      else if(this.nameVariable == '2'){
        name = 'certificate_green'
      }
      else{
        name = 'certificate_blue'
      }

      let nameSerie = 'last_serie_'+name
      let nameNumber = 'last_number_'+name
      let dataCertificate = {}
      dataCertificate[nameSerie] = this.serieCertificado
      dataCertificate[nameNumber] = this.numeroCertificado

      let data_certificado = {
        numero: this.serieCertificado+this.numeroCertificado,
        "color": this.nameVariable,
        "propiedad": this.matafuegoStore.matafuegoAImprimir.idPropiedad,
        "matafuego": this.matafuegoStore.matafuegoAImprimir.id
      }  
      console.log("vamos a imprimir esto: ")
      console.log(data_certificado)
      
      this.certificadoStore.postRequestCertificado(data_certificado)

    },
    imprimirAhora() {
      // actualizamos el matafuego seleccionado
      this.matafuegoStore.matafuegoAImprimir.procesado = true
      let matafuegoAImprimir = this.matafuegoStore.matafuegoAImprimir;
      //actualizamos numero de ticket
      this.certificarEsto()
      
      if(this.conTicket){
        //ponemos como procesado los matafuegos
        this.listMatafuegoDeTicket.find(function (dato) {
          if (dato.id == matafuegoAImprimir.id) {
            dato.procesado = true;
          }
        });

        this.isModalOpen2 = false;
        this.ticketCompletado();
      }
      else{
        this.cerrarModel()
      }
      
      this.matafuegoStore.matafuegoAImprimir.anioPH = this.anioPH;
      this.matafuegoStore.matafuegoAImprimir.mesPH =
        this.matafuegoStore.matafuegoAImprimir.mes;

      this.matafuegoStore.putRequestMatafuegoAImprimir();
      console.log("bueno aca llego ahre")
    },
    ticketCompletado() {
      let finalizar = true;
      this.listMatafuegoDeTicket.forEach((element) => {
        if (element.procesado == false) {
          finalizar = false;
        }
      });
      if (finalizar) {
        this.finalizarTicket();
      }
    },
    getPropiedad(id) {
      return this.clientesStore.list_propiedades.find(
        (element) => element.id == id
      );
    },
    getQuery() {
      let matafuego = this.matafuegoStore.matafuegoAImprimir;
      let propiedad = this.getPropiedad(matafuego.idPropiedad);
      let anioPh = this.anioPH ? this.anioPH.toString() : "";
      let otraInfo = {
        nameTipo: this.getTipo(matafuego.tipo),
        namePropiedad: propiedad.data,
        typePropiedad: propiedad.typePropiedad,
        anioPH: anioPh,
      };

      return { ...matafuego, ...otraInfo };
    },
    cerrarModel() {
      this.isModalOpen = false;
      this.$emit("cierre");
    },
  },
  mounted() {
    this.iniciarModel();
  },
};
</script>

<style scoped>
.root {
  position: relative;
}

.divDestacado {
  
  background-color: rgba(236, 236, 105, 0.726);
  font-weight: 600;
  padding: 10px;
}

.divDestacado input {
  background-color: #fffbc7;
  border: dashed 1px #858719 !important;
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

.certificadoImage {
  width: 14.3cm;
  height: 100%;
  margin-top: 1.2cm;
  margin-left: 1.9cm;
  opacity: 80%;
  z-index: 1;
}

.form-certificado-corto {
  width: 43px;
}

.form-certificado-largo {
  width: 90px;
}

.select-certificado {
  width: 150px !important;
  position: absolute;
  z-index: 10;
}

#impresion .p3b2 {
  margin-top: 4.5cm;
  margin-left: 8.5cm;
  line-height: 15px;
  font-size: 15px;
  position: absolute;
  z-index: 10;
}

#impresion p {
  font-weight: 900;
}
</style>
