<template>
  <hr />
  <!-- INPUT DEL BUSCADOR -->
  <div class="input-group input-group-lg buscadorCliente">
    <span class="input-group-text" id="inputGroup-sizing-lg"
      ><i class="bi bi-search"></i
    ></span>
    <input
      type="text"
      class="form-control"
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-lg"
      placeholder="DNI o RAZON SOCIAL"
      v-model="query"
      @input="clientesStore.searchUser(query)"
    />
    <button class="btn btn-secondary" @click="crearCliente()">+</button>
  </div>

  <!-- form para nuevo cliente -->
  <div class="formNuevoCliente" v-if="formNuevoCliente">
    <div class="col-12">
      <label class="visually-hidden" for="dniInput">XXXXXXXX</label>
      <div class="input-group">
        <div class="input-group-text">DNI/CUIT</div>
        <input type="text" 
        class="form-control" 
        id="dniInput" 
        v-model="clientesStore.newCliente.dni"/>
      </div>
    </div>

    <div class="col-12">
      <label class="visually-hidden" for="razonSocialInput">INGRESE TEXTO</label>
      <div class="input-group">
        <div class="input-group-text">Nombre / Razon Social</div>
        <input type="text" 
        class="form-control" 
        id="razonSocialInput" 
        v-model="clientesStore.newCliente.razonSocial" />
      </div>
    </div>

    <div class="col-12">
      <label class="visually-hidden" for="numberInput">11XXXXXXX</label>
      <div class="input-group">
        <div class="input-group-text">Celular / Tel</div>
        <input type="number" 
        class="form-control" 
        id="numberInput" 
        v-model="clientesStore.newCliente.celular"/>
      </div>
    </div>

    <button class="btn btn-secondary" @click="addCliente()">Agregar Cliente</button>
  </div>

  <!-- TARJETAS DE LOS CLIENTES SEGUN BUSCADOR -->
  <div class="tarjetasClientes">
    <div
      class="card"
      style="width: 18rem"
      v-for="(cliente, i) in clientesStore.clientesPorQuery"
      :key="i"
    >
      <div class="card-body">
        <h5 class="card-title">{{ cliente.razonSocial }}</h5>
        <p class="card-text">
          <b>Dni:</b> {{ cliente.dni }} <br />
        </p>
        <a href="#" class="btn btn-primary" @click="seleccionCliente(cliente)"
          >Seleccionar</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useClientesStore } from "@/stores/clientes";
import { useMatafuegoStore } from "@/stores/matafuegos"

export default {
  setup() {
    const clientesStore = useClientesStore();
    const matafuegoStore = useMatafuegoStore();

    return { clientesStore, matafuegoStore };
  },
  data() {
    return {
      formNuevoCliente: false,
      query: "",
    };
  },

  methods: {
    seleccionCliente(cliente) {
      this.clientesStore.selectCliente(cliente);
      this.clientesStore.flagBuscaCliente = false;
      this.clientesStore.getPropiedades()
      this.matafuegoStore.matafuegosDelCliente(this.clientesStore.clienteSeleccionado.id)
    },
    crearCliente() {
      this.clientesStore.resetCliente()

      if (!isNaN(this.query)) {
        this.clientesStore.newCliente.dni = this.query;
      } else {
        this.clientesStore.newCliente.razonSocial = this.query;
      }
      this.formNuevoCliente = true;
    },
    addCliente() { 
      console.log(this.clientesStore.newCliente)
      this.clientesStore.postRequestCliente(this.clientesStore.newCliente)
      this.formNuevoCliente = false;
    },
  },
};
</script>

<style scoped>
.buscadorCliente {
  width: 50%;
  margin: auto;
  margin-top: 50px;
}

.tarjetasClientes {
  display: flex;
  justify-content: center;
  margin: 30px;
}

.tarjetasClientes .card {
  margin: 10px;
}

.formNuevoCliente{
  width: 30%;
  margin: auto;
  margin-top: 10px;
}
</style>