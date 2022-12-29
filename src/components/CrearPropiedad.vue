<template>
  <div class="formNuevaPropiedad">
    <div class="col-sm-12">
      <div class="input-group">
        <div class="input-group-text">Tipo</div>
        <select class="form-select" v-model="newPropiedad.typePropiedad">
          <option value="1">Vehiculo</option>
          <option value="2">Domicilio</option>
        </select>
      </div>
    </div>

    <div class="col-12">
      <div class="input-group">
        <div class="input-group-text">Dato</div>
        <input
          type="text"
          class="form-control"
          v-model="newPropiedad.data"
        />
      </div>
    </div>

    <button class="btn btn-secondary" @click="addPropiedad()">
      Agregar Propiedad
    </button>
  </div>
</template>

<script>
import { useClientesStore } from "@/stores/clientes";

export default {
  props: ['idCliente'],
  setup() {
    const clientesStore = useClientesStore();

    return { clientesStore };
  },
  data() {
    
    return {
      newPropiedad: {
        idCliente: 0,
        typePropiedad: "",
        data: "",
      },
    };
  },
  methods: {
    addPropiedad(){
      this.newPropiedad.idCliente = this.idCliente
      this.clientesStore.postRequestPropiedad(this.newPropiedad)

      this.clientesStore.flagFormPropiedad=false
      return false
      }
  },
};
</script>

<style scoped>
.formNuevaPropiedad{
  width: 30%;
  margin: auto;
  margin-top: 10px;
}
</style>