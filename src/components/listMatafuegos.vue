<template>
<div v-if="matafuegoStore.listMatafuegosDelCliente.length !=0">
    <ModelTicket v-if="isModalOpen" :conTicket="false" @cierre="isModalOpen=false"/>
    <table class="table table-dark table-striped">
        <thead>
            <tr>
            <th scope="col">Estado</th>
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
                <td v-if="matafuego.procesado" style="color:green">procesado</td>
                <td v-else style="color:red">no procesado</td>
                <td>{{matafuego.numeroMatafuego}}</td>
                <td>{{getTipo(matafuego.tipo)}}</td>
                <td>{{matafuego.capacidad}}</td>
                <td>{{clientesStore.getDataPropiedad(matafuego.idPropiedad)}}</td>
                <td>{{matafuego.mes +'/'+matafuego.year}}</td>
                <td><button @click="certificar(matafuego)">certificado</button></td>
            </tr>
        </tbody>
    </table>
</div>
</template>


<script>
import { useClientesStore } from "@/stores/clientes";
import { useMatafuegoStore } from "@/stores/matafuegos"
import ModelTicket from "@/components/ModelTicket.vue"

export default {
components: {ModelTicket},
  setup() {
    const clientesStore = useClientesStore();
    const matafuegoStore = useMatafuegoStore();

    return { clientesStore, matafuegoStore };
  },
  data(){
    return {
        isModalOpen:false
    }
    
  },
  methods:{
    certificar(matafuego){
        this.matafuegoStore.matafuegoAImprimir = matafuego
        this.isModalOpen = true
    },
    getTipo(id) {
      return this.matafuegoStore.tiposMatafuegos.find(
        (element) => element.id == id
      ).title;
    },
  }
}

</script>

<style scoped>
table{
    width: 70%;
  margin: auto;
  margin-top: 50px;
}

</style>