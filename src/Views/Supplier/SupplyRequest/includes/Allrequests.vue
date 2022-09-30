<template>
    <div >
      <div class="anim" style="--delay:0.2s;">
      <b-table 
        ref="requestTable"
        :data="request"
        :loading="is_table_loading"
        hover
        responsive
      >
      <b-table-column field="id" label="ID">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.id }}
          </template>
        </b-table-column>
        <b-table-column field="request" label="Request">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.request }}
          </template>
        </b-table-column>
        <b-table-column field="created_at" label="Recieved Date">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.created_at }}
          </template>
        </b-table-column>
        <b-table-column field="due_date" label="Due Date">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.due_date }}
          </template>
        </b-table-column>
        <b-table-column field="status" label="Status">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.status }}
          </template>
        </b-table-column>

        <b-table-column field="action" label="Action">
          <template v-slot="props">
            <b-tooltip label="View More"
                       position="is-right" target="">
              <b-button outlined style="border: hidden; background-color: #1f1d2b;" @click="updateState(props.row)">
                <svg class="bi bi-pencil-square" fill="currentColor" height="16" viewBox="0 0 16 16" style="color: #ff7551"
                     width="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    fill-rule="evenodd"/>
                </svg>
              </b-button>
            </b-tooltip>
          </template>
        </b-table-column>
  
        <!-- <b-table-column field="action" label="Delete">
          <template v-slot="props">
            <b-tooltip label="Delete"
                       position="is-right" target="">
              <b-button outlined style="border: hidden; background-color: #1f1d2b;" >
                <svg class="bi bi-trash-fill" fill="red" height="16" viewBox="0 0 16 16" width="16" style="color: rgb(252, 72, 72)"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
              </b-button>
            </b-tooltip>
          </template>
        </b-table-column> -->
  
      </b-table>
    </div>
    <update_state ref="update_state" @getAllStaff="getAllRequests"/>
    </div>
  </template>
  
  <script>
  import SupplierApis from '../../../../apis/modules/supplier_apis/supplier_apis';
  import update_state from "../includes/update_state";
  import jspdf from "jspdf";
  import "jspdf-autotable"
  
  export default {
    name: "all_request",
    components: {
      update_state
    },
    data() {
      return {
        selected_status: undefined,
        fields: [
          {
            field: 'id',
            label: 'ID',
            width: '40',
            numeric: true
          },
          {
            field: 'request',
            label: 'Request Details',
          },
          {
            field: 'created_at',
            label: 'Created At',
          },
          {
            field: 'due_date',
            label: 'Due Date',
          },
          {
            field: 'status',
            label: 'Status',
          }
        ],
        request: [],
        is_table_loading: false
      }
    },

    watch: {
    selected_status() {
      this.getAllRequests(this.selected_status)
    }
    },
    methods: {
      async getAllRequests(status) {
        try {
          this.is_table_loading = true
          let respond = (await SupplierApis.getAllRequests(status)).data.data.requests
          this.request = respond.map((e, index) => ({
            id: index + 1,
            _id:e._id,
            request: e.request.substring(0, 50),
            created_at: e.created_at.substring(0, 10),
            due_date: e.due_date.substring(0, 10),
            status: e.status
          }))
        } catch (e) {
  
        }
        this.is_table_loading = false
      },

      generatePDF() {
      const doc = new jspdf({
        orientation: "portrait",
        unit: "in",
        format: "letter"
      });

      const columns = [
        { title: "#", dataKey: "id" },
        { title: "Request", dataKey: "request" },
        { title: "Recived Date", dataKey: "created_at" },
        { title: "Due Date", dataKey: "due_date" },
        { title: "Updated At", dataKey: "updated_at" },
        { title: "Status", dataKey: "status" }
      ];
      const tableRows = [];

      this.request.slice(0).map(request => {
        let addrequest = {
          id: request.id,
          request_code: request.request_code,
          created_at: request.created_at,
          due_date: request.due_date,
          updated_at: request.updated_at,
          status: request.status
        };
        tableRows.push(addrequest);
      });

      doc.autoTable({
        columns,
        body: tableRows,
        margin: { left: 0.5, top: 1.25 }
      });

      const date = Date().split(" ");
      const dateStr = date[1] + "-" + date[2] + "-" + date[3];
      doc.text("Supply-Requests-Report", 14, 15).setFontSize(100);
      doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
      doc.save(`Supply-Requests-Report_${dateStr}.pdf`);

    },
  
      updateState(data){
        this.$refs.update_state.openModal(data)
      },
      
      closeModel() {
        this.getAllRequests(this.selected_status)
      },
  
    },
  
    async mounted() {
      await this.getAllRequests(this.selected_status)
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  