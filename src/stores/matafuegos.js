import { defineStore } from "pinia";
import axios from 'axios';

export const useMatafuegoStore = defineStore('matafuegos', {
    state: () => {
      return {
        cantidad:null,
        slugApi: 'matafuegos/',
        listMatafuegosDelCliente:[],
        listMatafuegos: [],
        tiposMatafuegos: [],
        matafuegoAImprimir: null,
      }
    },
    actions:{
        addMatafuego(newMatafuego){
            this.listMatafuegos.push(newMatafuego)
        },
        matafuegosDelCliente(id){
            console.log(id)
            const lista_a_mostrar = [];
            let cantidad = 0
            for (let matafuego of this.listMatafuegos){
                if (matafuego.idCliente == id) {
                    cantidad++
                    lista_a_mostrar.push(matafuego);
                }
            }
            this.cantidad = cantidad
            console.log(lista_a_mostrar)
            this.listMatafuegosDelCliente = lista_a_mostrar
        },
        async getRequest(idCliente){
            let params = {
                idCliente: idCliente,
              };
            //get matafuegos
            let req = await axios.get(this.slugApi,{ params })
            this.listMatafuegos = req.data
            this.listMatafuegosDelCliente = req.data

            return true
        },
        postRequest(data){ 
            //post matafuegos
            axios.post(this.slugApi,data).then(response => {
                // this.listMatafuegos.push(response.data) 
                this.listMatafuegosDelCliente.push(response.data)
                console.log("Add matafuego ✔")
            })
            .catch(errror => {
                console.log(errror.data)
            })
        },
        putRequestMatafuegoAImprimir(){
            let matafuego = this.matafuegoAImprimir
            let data = {
                'procesado' : matafuego.procesado,
                'numeroMatafuego' : matafuego.numeroMatafuego,
                'anioFabricacion' : matafuego.anioFabricacion,
                'mesPH' : matafuego.mesPH,
                'anioPH':matafuego.anioPH,
                'mes':matafuego.mes,
                'year':matafuego.year,
                'idPropiedad':matafuego.idPropiedad
            }
            axios.put(this.slugApi+matafuego.id+'/',data).then().catch(errror => {console.log(errror.response)
            })
            this.getRequest() 
        },
        cambiarEstadoProcesado(lista){
            console.log(lista)
            lista.forEach(id => {
                let data = {'procesado':false}
                axios.put(this.slugApi+id+'/',data).then().catch(errror=>{console.log(errror)})
            });

            this.getRequest() 

        }

      }

  })