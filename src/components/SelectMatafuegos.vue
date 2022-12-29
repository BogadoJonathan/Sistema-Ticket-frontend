<template>
<div v-if="cargado">
  <!-- MUESTRA O NO LA LISTA DE MATAFUEGOS SEGUN EL CLIENTE -->
  <h3 v-if="matafuegoStore.listMatafuegosDelCliente.length ==0" style="color: red">
    No tiene matafuegos asociados
  </h3>
  <!-- <div id="myBtnContainer">
    <button
      :class="activo == 'todos' ? 'btn active' : 'btn'"
      @click="filterSelection('todos')"
    >
      todos
    </button>
    <button
      :class="activo == 'vehiculos' ? 'btn active' : 'btn'"
      @click="filterSelection('vehiculos')"
    >
      vehiculos
    </button>
    <button
      :class="activo == 'domicilios' ? 'btn active' : 'btn'"
      @click="filterSelection('domicilios')"
    >
      domicilios
    </button>
  </div> -->
  <div v-if="matafuegoStore.listMatafuegosDelCliente.length!=0" style="display: flex; justify-content: space-evenly; flex-wrap: wrap">
    <div
      v-for="(matafuego, i) in matafuegoStore.listMatafuegosDelCliente"
      :key="i"
    >
      <div
        class="cardMatafuego"
        style="display: flex"
      >
        <div class="image">
          <img
            :src="imagenTipo(matafuego.tipo)"
            alt=""
          />
        </div>
        <div>
          <p>{{matafuego.numeroMatafuego}}</p>
          <p>
            <i class="bi bi-card-heading"></i>&nbsp;
            {{ getTipo(matafuego.tipo) }}
          </p>
          <p>{{ clientesStore.getDataPropiedad(matafuego.idPropiedad) }}</p>

          <button
            v-if="!ticketStore.listMatafuegoSelect.includes(matafuego.id)"
            @click="AgregarMatafuego(matafuego)"
            class="btn btn-danger"
          >
            <i class="bi bi-box-arrow-in-up"></i> ingresar
          </button>
          <button
            v-else
            class="btn btn-secondary"
            @click="QuitarMatafuego(matafuego.id)"
          >
            <i class="bi bi-x-lg"></i> Quitar
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- agregar nuevo matafuego -->
  <div>
    <div class="formNewMatafuego row gx-3 gy-2 align-items-center">
      <div class="col-sm-5">
        <div class="input-group">
          <div class="input-group-text">Selecciona Tipo *</div>
          <select class="form-select" v-model.number="newMatafuego.tipo">
            <option
              v-for="(tipo, i) in matafuegoStore.tiposMatafuegos"
              :key="i"
              :value="tipo.id"
            >
              {{ tipo.title }}
            </option>
          </select>
        </div>
      </div>

      <div class="col-sm-5">
        <div class="input-group">
          <div class="input-group-text">Selecciona Capacidad *</div>
          <select class="form-select" v-model="newMatafuego.capacidad">
            <option
              v-for="(capacidad, i) in capacidades"
              :key="i"
              :value="capacidad"
            >
              {{ capacidad }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-sm-10">
        <div class="input-group">
          <div class="input-group-text">Asocie matafuego*</div>
          <select class="form-select" v-model.number="newMatafuego.idPropiedad">
            <option
              v-for="(propiedad, i) in clientesStore.propiedadesDelCliente"
              :key="i"
              :value="propiedad.id"
            >
              {{ propiedad.typePropiedad == 2 ? "🏠" : "🚗" }}
              {{ propiedad.data }}
            </option>
          </select>
          <button
            class="btn btn-secondary"
            @click="clientesStore.flagFormPropiedad = true"
          >
            +
          </button>
        </div>
        <CrearPropiedad :idCliente="clientesStore.clienteSeleccionado.id" v-if="clientesStore.flagFormPropiedad" />
      </div>


      <div class="col-sm-10 ">
          <div class="input-group">
            <div class="input-group-text">n° matafuego</div>
            <input
              type="text"
              class="form-control"
              placeholder="XXXXXXX"
              v-model="newMatafuego.numeroMatafuego"
            />
            <div class="input-group-text">Año fabricacion</div>
            <input
              maxlength="2"
              type="text"
              class="form-control"
              placeholder="XXXX"
              v-model="newMatafuego.anioFabricacion"
            />
          </div>


        </div>

      <div class="col-sm-3">
        <div v-if="errors.length > 0">
          <ul class="text-danger fw-bold">
            <li v-for="error in errors" v-bind:key="error.index">
              {{ error }}
            </li>
          </ul>
        </div>

        <button @click="validarContenidoCargado" class="btn btn-dark">
          Crear matafuego
        </button>
      </div>
    </div>
    <br />
  </div>

  <button
    class="btn btn-secondary btn-lg"
    @click="ticketStore.listMatafuegoSelect.length >= 1? finalizarTicket() : ''"
    style="margin-top:100px"
  >
    CREAR TICKET
  </button>
  <h1 v-if="ticketStore.ticketFinalizado">{{ ticketStore.lastNumber }}</h1>
  </div>
</template>

<script>
import CrearPropiedad from "@/components/CrearPropiedad.vue";
import { useMatafuegoStore } from "@/stores/matafuegos";
import { useClientesStore } from "@/stores/clientes";
import { useTicketStore } from "@/stores/ticket";
import { computed } from "@vue/runtime-core";

export default {
  components: {
    CrearPropiedad,
  },
  setup() {
    const matafuegoStore = useMatafuegoStore();
    const clientesStore = useClientesStore();
    const ticketStore = useTicketStore();

    return { matafuegoStore, clientesStore, ticketStore };
  },
  data() {
    return {
      filtros: ["1", "2"], //vehiculo, domicilio
      activo: "todos",
      errors: [],
      propiedadesCliente: [],
      cargado:false,
      newMatafuego: {
        tipo: "",
        idPropiedad: null,
        procesado: false,
        capacidad: "",
        numeroMatafuego: "",
        anioFabricacion: "",
        mesPH: "",
        anioPH: "",
        mes: "",
        year: "",
        idCliente: this.clientesStore.clienteSeleccionado.id,
      },
    };
  },
  methods: {
    validarContenidoCargado(e) {
      e.preventDefault();
      this.errors = [];
      if (
        this.newMatafuego.tipo &&
        this.newMatafuego.capacidad
      ) {
        //parseamos tipo
        //this.newMatafuego.idPropiedad = parseInt(this.newMatafuego.idPropiedad)
        this.newMatafuego.capacidad = parseFloat(this.newMatafuego.capacidad);
        console.log(this.newMatafuego);
        //agregamos matafuego
        this.matafuegoStore.postRequest(this.newMatafuego);
        //reseteamos el newMatafuego
        this.newMatafuego = {
          tipo: "",
          idPropiedad: null,
          procesado: false,
          capacidad: "",
          numeroMatafuego: "",
          anioFabricacion: "",
          mesPH: "",
          anioPH: "",
          mes: "",
          year: "",
          idCliente: this.clientesStore.clienteSeleccionado.id,
        };
        return;
      }
      if (this.newMatafuego.tipo === "") {
        this.errors.push("El Tipo es obligatorio.");
      }
      if (this.newMatafuego.capacidad === "") {
        this.errors.push("la capacidad es obligatorio.");
      }
      e.preventDefault();
    },
    AgregarMatafuego(matafuego) {
      this.ticketStore.listMatafuegoSelect.push(matafuego.id);
    },
    QuitarMatafuego(id) {
      this.ticketStore.listMatafuegoSelect =
        this.ticketStore.listMatafuegoSelect.filter((item) => item !== id);
    },
    getTipo(id) {
      return this.matafuegoStore.tiposMatafuegos.find(
        (element) => element.id == id
      ).title;
    },
    imagenTipo(id){
      let tipo = this.matafuegoStore.tiposMatafuegos.find(
          (element) => element.id == id
        );
      if (tipo.image){
        return tipo.image
      }
      return ''
    },
    filterSelection(dato) {
      if (dato == "todos") {
        this.filtros = ["1", "2"];
        this.activo = "todos";
      } else if (dato == "vehiculos") {
        this.filtros = ["1"];
        this.activo = "vehiculos";
      } else if (dato == "domicilios") {
        this.filtros = ["2"];
        this.activo = "domicilios";
      }
    },
    finalizarTicket(){
      this.matafuegoStore.cambiarEstadoProcesado(this.ticketStore.listMatafuegoSelect)
      this.ticketStore.crearTicket(this.clientesStore.clienteSeleccionado.id)
    }
  },
  computed: {
    capacidades() {
      if (this.newMatafuego.tipo) {
        let id_tipo = this.newMatafuego.tipo;
        let tipo = this.matafuegoStore.tiposMatafuegos.find(
          (element) => element.id == id_tipo
        );
        console.log(tipo.capacidades);
        return Array.from(tipo.capacidades);
      } else {
        return [];
      }
    },
  },
  mounted() {
    this.ticketStore.listMatafuegoSelect = [];

    this.clientesStore.getRequestPropiedad(this.clientesStore.clienteSeleccionado.id)
    this.cargado = this.matafuegoStore.getRequest(this.clientesStore.clienteSeleccionado.id)
  },
};
</script>

<style scoped>
.cardMatafuego {
  margin: 10px;
  padding: 10px;
  border: 2px solid red;
}
.cardMatafuego .image img {
  height: 100px;
  margin-right: 20px;
}

.formNewMatafuego {
  margin: auto;
  width: 80em;
  display: flex;
  justify-content: center;
}

#myBtnContainer {
  display: flex;
  justify-content: center;
}
</style>