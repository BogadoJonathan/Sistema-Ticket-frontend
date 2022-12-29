<template>
  <div id="impresion">
    <p class="p1">{{$route.query.numeroMatafuego}}</p>
    <p class="p2">{{$route.query.anioFabricacion}}</p>
    <p class="p3">{{$route.query.mesPH}}</p>
    <p class="p4">{{$route.query.anioPH}}</p>
    <p class="p5">{{$route.query.capacidad}}</p>
    <p class="p6">{{$route.query.nameTipo}}</p>

    <p class="p1a">Protect&nbsp;Persons</p>
    <p class="p2a">028</p>
    <p class="p3a">028</p>
    <p class="p4a">{{$route.query.numeroMatafuego}}</p>
    <p class="p5a">{{$route.query.mesPH}}</p>
    <p class="p6a">{{$route.query.anioPH}}</p>

    <p class="p1b">{{$route.query.mes}}</p>
    <p class="p2b">{{$route.query.year}}</p>
    <p v-if="$route.query.typePropiedad == '2'" class="p3b">
      {{$route.query.namePropiedad}}
    </p>
    <p v-else class="pxb">{{$route.query.namePropiedad}}</p>
    <p class="p4b">{{$route.query.mes}}</p>
    <p class="p5b">{{$route.query.year}}</p>
    <p v-if="$route.query.typePropiedad == '1'" class="p6b">{{$route.query.namePropiedad}}</p>

    <!-- <div class="espacio1"></div> -->

    <!-- <div class="tarjeta2">
        <p class="p1">337051</p>
        <p class="p2">2005</p>
        <p class="p3">11</p>
        <p class="p4">24</p>
        <p class="p5">10</p>
        <p class="p6">AFFF</p>

        <p class="p1a">Protect&nbsp;Persons</p>
        <p class="p2a">028</p>
        <p class="p3a">028</p>
        <p class="p4a">337051</p>
        <p class="p5a">11</p>
        <p class="p6a">24</p>

        <p class="p1b">11</p>
        <p class="p2b">23</p>
        <p class="p3b">RESIPLAS&nbsp;S.A BLANCO&nbsp;ENCALADA&nbsp;2936 LANUS&nbsp;ESTE</p>
        <p class="p4b">11</p>
        <p class="p5b">23</p>
    </div> -->
  </div>
</template>

<script>
import { useMatafuegoStore } from "@/stores/matafuegos";
import { useClientesStore } from "@/stores/clientes";
import axios from 'axios';

export default {
  setup() {
    const matafuegoStore = useMatafuegoStore();
    const clientesStore = useClientesStore();

    return {matafuegoStore,clientesStore}
  },
  mounted() {
    window.print();
  },
};
</script>

<style>
#impresion {
  text-align: left;
  float: left;
  position: absolute;
  margin-top: -10px;
}
#oblea {
  margin-top: 10.2cm;
  border: 2px solid #000;
  position: absolute;
}

#impresion p {
  position: absolute;
  z-index: 10;
}

#impresion input {
  position: absolute;
  z-index: 10;
}
#impresion .p1 {
  margin-top: 2.9cm;
  margin-left: 2cm;
}
#impresion .p2 {
  margin-top: 2.9cm;
  margin-left: 4.1cm;
}
#impresion .p3 {
  margin-top: 2.9cm;
  margin-left: 5.4cm;
}
#impresion .p4 {
  margin-top: 2.9cm;
  margin-left: 6.1cm;
}
#impresion .p5 {
  margin-top: 2.9cm;
  margin-left: 6.9cm;
}
#impresion .p6 {
  margin-top: 2.9cm;
  margin-left: 7.9cm;
  width: 100px;
}

#impresion .p1a {
  margin-top: 3.6cm;
  margin-left: 1.9cm;
}
#impresion .p2a {
  margin-top: 3.6cm;
  margin-left: 6cm;
}
#impresion .p3a {
  margin-top: 3.6cm;
  margin-left: 8cm;
}
#impresion .p4a {
  margin-top: 3.6cm;
  margin-left: 10.3cm;
}
#impresion .p5a {
  margin-top: 3.6cm;
  margin-left: 12.2cm;
}
#impresion .p6a {
  margin-top: 3.6cm;
  margin-left: 13cm;
}

#impresion .p1b {
  margin-top: 5cm;
  margin-left: 2cm;
}
#impresion .p2b {
  margin-top: 5cm;
  margin-left: 3.2cm;
}
#impresion .p3b {
  margin-top: 4.5cm;
  margin-left: 4.5cm;
  line-height: 15px;
  font-size: 15px;
  width: 5cm;
}

#impresion .pxb{
  margin-top: 5cm;
  margin-left: 7.5cm;
}

#impresion .p4b {
  margin-top: 5cm;
  margin-left: 10.5cm;
}
#impresion .p5b {
  margin-top: 5cm;
  margin-left: 11.5cm;
}

#impresion .p6b {
  margin-top: 5cm;
  margin-left: 13cm;
}

#impresion .espacio1 {
  position: absolute;
  margin-top: 10.2cm;
}

#impresion .tarjeta2 {
  position: absolute;
  margin-top: 10.2cm;
}
</style>