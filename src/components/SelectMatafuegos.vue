<template>
<div v-if="cargado">
  <button v-if="!crearMatafuego" @click="crearMatafuego = !crearMatafuego" class="btn btn-dark">dar de alta un matafuego</button>
  <!-- agregar nuevo matafuego -->
  <div v-if="crearMatafuego">
    <div class="formNewMatafuego row gx-3 gy-2 align-items-center">
      <div class="col-sm-5">
        <div class="input-group">
          <div class="input-group-text">Selecciona Tipo<span style="color:red">&nbsp;*</span></div>
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
          <div class="input-group-text">Selecciona Capacidad<span style="color:red">&nbsp;*</span></div>
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
          <div class="input-group-text">Asocie matafuego<span style="color:red">&nbsp;*</span></div>
          <select class="form-select" v-model.number="clientesStore.propiedadSeleccionada">
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
            <!-- <div class="input-group-text">Año fabricacion</div>
            <input
              maxlength="2"
              type="text"
              class="form-control"
              placeholder="XXXX"
              v-model="newMatafuego.anioFabricacion"
            /> -->
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
          Dar de Alta un matafuego
        </button>
      </div>
    </div>
    <br />
  </div>
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
    <!-- <div
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
    </div> -->

    <table class="table table-dark table-striped">
        <thead>
            <tr>
            <th scope="col">procesado</th>
            <th scope="col">N° Matafuego</th>
            <th scope="col">Tipo</th>
            <th scope="col">Capacidad</th>
            <th scope="col">Propiedad</th>
            <th scope="col">vencimiento</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(matafuego, i) in matafuegoStore.listMatafuegosDelCliente" :key="i">
                <td>{{matafuego.procesado?'✅':'⏳'}}</td>
                <td>{{matafuego.numeroMatafuego}}</td>
                <td>{{getTipo(matafuego.tipo)}}</td>
                <td>{{matafuego.capacidad}}</td>
                <td>{{clientesStore.getDataPropiedad(matafuego.idPropiedad)}}</td>
                <td>{{matafuego.mes +'/'+matafuego.year}}</td>
                <td><button
                    v-if="!ticketStore.listMatafuegoSelect.includes(matafuego.id)"
                    @click="AgregarMatafuego(matafuego)"
                    class="btn btn-danger"
                  >
                    Seleccionar
                  </button>
                  <button
                    v-else
                    class="btn btn-secondary"
                    @click="QuitarMatafuego(matafuego.id)"
                  >
                    <i class="bi bi-x-lg"></i> Quitar
                  </button>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
  <br><br>
  

  <button
    class="btn btn-secondary btn-lg"
    @click="ticketStore.listMatafuegoSelect.length >= 1? finalizarTicket() : alerta('Debe seleccionar al menos un matafuego')"
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
      crearMatafuego:false,
      newMatafuego: {
        tipo: "",
        idPropiedad: null,
        procesado: false,
        capacidad: "",
        numeroMatafuego: "",
        anioFabricacion: "",
        mesPH: "",
        anioPH: null,
        mes: "",
        year: "",
        idCliente: this.clientesStore.clienteSeleccionado.id,
      },
    };
  },
  methods: {
    alerta(mensaje) {
      alert(mensaje);
    },
    validarContenidoCargado(e) {
      e.preventDefault();
      this.errors = [];
      this.newMatafuego.idPropiedad = this.clientesStore.propiedadSeleccionada
      if (
        this.newMatafuego.tipo &&
        this.newMatafuego.capacidad &&
        this.newMatafuego.idPropiedad
      ) {
        this.newMatafuego.capacidad = parseFloat(this.newMatafuego.capacidad);
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
          anioPH: null,
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
      if (!this.newMatafuego.idPropiedad) {
        this.errors.push("la propiedad es obligatoria.");
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
    this.clientesStore.propiedadSeleccionada = null
    // this.clientesStore.getRequestPropiedad(this.clientesStore.clienteSeleccionado.id)
    this.cargado = this.matafuegoStore.getRequest(this.clientesStore.clienteSeleccionado.id)
  },
};
</script>

<style scoped>
table{
    width: 70%;
  margin: auto;
  margin-top: 50px;
}
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