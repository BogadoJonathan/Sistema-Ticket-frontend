<template>
<h1>BUSCAR CLIENTE</h1>

<buscadorCliente />
<listMatafuegos />
</template>

<script>
import buscadorCliente from "@/components/BuscadorCliente.vue"
import listMatafuegos from "@/components/listMatafuegos.vue"

export default {
  components: {
    buscadorCliente,
    listMatafuegos
  },
  data(){

  }
}
</script>


<style scoped>

</style>