<template>
<div v-if="!clientesStore.clienteSeleccionado">
  <h1>BUSCAR CLIENTE</h1>
  <buscadorCliente  />
</div>
<div v-else>
  <button class="btn btn-success" @click="clientesStore.clienteSeleccionado=null">buscar otro cliente</button>
  <h1>LISTA DE MATAFUEGOS</h1>
  <listMatafuegos />
</div>


</template>

<script>
import buscadorCliente from "@/components/BuscadorCliente.vue"
import { useMatafuegoStore } from "@/stores/matafuegos"
import { useClientesStore } from "@/stores/clientes";
import listMatafuegos from "@/components/listMatafuegos.vue"


export default {
  components: {
    buscadorCliente,
    listMatafuegos
  },
  setup() {
    const matafuegoStore = useMatafuegoStore();
    const clientesStore = useClientesStore();

    return { matafuegoStore,clientesStore };
  },
  data(){

  }
}
</script>


<style scoped>

</style>