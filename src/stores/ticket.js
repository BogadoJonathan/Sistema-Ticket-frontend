import { defineStore } from "pinia";
import axios from "axios";

export const useTicketStore = defineStore('ticket', {
    state: () => {
      return {
        slugApiTicket:'tickets/',
        slugApiConfig:'config/',
        clienteActual: null,
        listMatafuegoSelect:[],
        flagEspera:null,
        lastNumber: null,
        ticketFinalizado: false,
        listTickets:[]
      }
    },
    actions:{
      async crearTicket(idCliente){
            let req = await axios.get(this.slugApiConfig)
            this.lastNumber = req.data[0]['last_number_ticket']
            this.lastNumber++

            let newTicket = {
                number: this.lastNumber,
                clienteId : idCliente,
                listMatafuegos: Array.from(this.listMatafuegoSelect),
                espera: this.flagEspera,
                finalizado: false
            }
            console.table(newTicket)
            //guardamos ticket en BD 
            this.postRequestTicket(newTicket)
            //modificamos el ultimo numero de ticket
            this.putRequestConfig()
            this.ticketFinalizado = true
        },
        resetTicket(){
            this.clienteActual= null
            this.listMatafuegoSelect=[]
            this.flagEspera = null
            this.lastNumber = null
            this.ticketFinalizado = false
        },
        getRequestTicket(){
          //get ticket
          axios.get(this.slugApiTicket).then(response => {
            this.listTickets = response.data
            console.log("get tickets ✔");
          })
          .catch(errror => {
            console.log(errror)
          })
        },
        postRequestTicket(data){
          //post Cliente
          axios.post(this.slugApiTicket,data).then(response => {
            this.listTickets.push(response.data) 
            console.log("Add Ticket ✔");
            return response.data.id
          })
          .catch(errror => {
              console.log(errror)
          })
        },
        getRequestConfig(){
          //get config
          axios.get(this.slugApiConfig).then(response => {
            console.log('este valor tiene que ser: '+response.data[0]['last_number_ticket'])
            this.lastNumber = response.data[0]['last_number_ticket']
          })
          .catch(errror => {
            console.log(errror)
          })
        },
        putRequestConfig(){
          let data = {
            'last_number_ticket' : this.lastNumber
          }
          axios.put(this.slugApiConfig+'1/',data).then(response => {
            this.listTickets.push(response.data) 
            console.log("ultimo numero de Ticket ✔");
            return response.data.id
          })
          .catch(errror => {
              console.log(errror)
          })
        },
        putRequestTicket(data){
          axios.put(this.slugApiTicket+data.id+'/',data).then(response => {
            this.getRequestTicket() 
            console.log("put Ticket ✔");
          })
          .catch(errror => {
              console.log(errror)
          })
        }

    }
})