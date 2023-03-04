import { defineStore } from "pinia";
import axios from 'axios';

export const useClientesStore = defineStore('clientes', {
    state: () => {
        return {
            slugApi : 'propiedades/',
            slugApiCliente: 'clientes/',
            flagBuscaCliente:true,
            flagFormPropiedad:false,
            newCliente:null,
            clienteSeleccionado: null,
            clientesPorQuery: [],
            propiedadesDelCliente:[],
            list_propiedades:[],
            list_clientes: [],
            dataOneCliente:null,
            propiedadSeleccionada:null
        }
    },
    actions: {
        searchUser(query) {
            const q = query.toLowerCase();
            if (q.length > 2) {

                let lista = this.getClientesForQuery(q)
                // const lista_clientes = [];
                // for (let cliente of this.list_clientes) {
                //     let razonSocial = cliente.razonSocial.toLowerCase();
                //     let dni = cliente.dni;
                //     if (razonSocial.indexOf(q) != -1 || dni.indexOf(q) != -1) {
                //         lista_clientes.push(cliente);
                //     }
                // }
            } else {
                this.clientesPorQuery = [];
            }
        },
        getPropiedades(){
            this.propiedadesDelCliente=[]
            for (let propiedad of this.list_propiedades){
                if (propiedad.idCliente == this.clienteSeleccionado.id) {
                    this.propiedadesDelCliente.push(propiedad);
                }
            }
        },
        selectCliente(cliente){
            this.clienteSeleccionado = cliente
        },
        resetCliente(){
            this.newCliente = {
                dni: "",
                razonSocial: "",
                celular: "",
            }
            this.flagBuscaCliente=true
            this.clienteSeleccionado=null
            this.clientesPorQuery=[]
        },
        getDataPropiedad(id){
            let elementPropiedad= this.propiedadesDelCliente.find(element => element.id == id)
            let icono = elementPropiedad.typePropiedad == 2? '🏠':'🚗'
            return icono+ ' '+ elementPropiedad.data
        },
        getAllPropiedadId(idCliente){
            let elementPropiedad= this.list_propiedades.filter(element => element.idCliente == idCliente)
            return elementPropiedad
        },
        getTipoPropiedad(id){
            let filtros= ['1','2']
            let elementPropiedad= this.propiedadesDelCliente.find(element => element.id == id)
            return elementPropiedad.typePropiedad
        },
        getRequestPropiedadPorData(data){
            axios.get(this.slugApi,{params: data }).then(response => {
                console.log(response.data)
                this.clientesPorQuery = []
                this.getClienteForPropiedad(response.data)
                console.log("get propiedades ✔");
            })
            .catch(errror => {
                console.log(errror)
            })
        },
        getRequestPropiedad(idCliente){
            let params = {
                idCliente: idCliente,
              };
            //get propiedades
            axios.get(this.slugApi,{ params }).then(response => {
                this.list_propiedades = response.data
                this.propiedadesDelCliente = response.data
                console.log(response.data)
                console.log("get propiedades ✔");
            })
            .catch(errror => {
                console.log(errror)
            })
        },
        postRequestPropiedad(data){
            //post propiedad
            axios.post(this.slugApi,data).then(response => {
                this.list_propiedades.push(response.data) 
                // this.propiedadesDelCliente.push(response.data)
                console.log("Add propiedad ✔");
                this.propiedadSeleccionada = response.data.id
            })
            .catch(errror => {
                console.log(errror.data)
            })
        },
        async getOneClient(id){
            //get cliente
            let req = await axios.get(this.slugApiCliente+id)
            
            this.dataOneCliente = req.data
            this.getRequestPropiedad(this.dataOneCliente.id)
        },
        async getClienteForPropiedad(lista){
            this.clientesPorQuery = []
            console.log("lista")
            for(let propiedad in lista){
                let data = lista[propiedad]
                let req = await axios.get(this.slugApiCliente+data.idCliente)
                this.clientesPorQuery.push(req.data)
            }
        },
        getRequestCliente(){
            //get cliente
            axios.get(this.slugApiCliente).then(response => {
                this.list_clientes = response.data
                console.log("get clientes ✔");
            })
            .catch(errror => {
                console.log(errror)
            })
        },
        async getClientesForQuery(query){
            //get cliente
            let params = {
                'query' : query
            }
            let req = await axios.get(this.slugApiCliente,{params : params})
            this.clientesPorQuery = req.data
            console.log(data)
            console.log(req.data)
        },
        
        postRequestCliente(data){
            //post Cliente
            axios.post(this.slugApiCliente,data).then(response => {
                this.list_clientes.push(response.data) 
                this.clientesPorQuery.push(response.data)
                console.log("Add Cliente ✔");
                return response.data.id
            })
            .catch(errror => {
                console.log(errror.data)
            })
        },

    },

})