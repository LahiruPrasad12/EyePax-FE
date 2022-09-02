<template>
  <div class="container is-max-desktop mb-5">
    <header>
<!--      <h1>Admin Dashboard</h1>-->
    </header>
    <b-row style="margin-left: 10%;">
      <b-col  style="width: 35%;" md="6">
        <div style="background-color: cornflowerblue" class="card">
          <div class="card-content">
            <div class="content">
                <b-row>
                  <b-col md="10">
                    <h1>Total Staff</h1>
                  </b-col>
                  <b-col md="2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
                      <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
                    </svg>
                  </b-col>
                  <div style="text-align: center;font-size: 400%; margin-top: -5%">76</div>
                </b-row>


            </div>
          </div>
        </div>
      </b-col>
      <b-col style="width: 35%; margin-left: 5%" md="6">
        <div style="background-color: palevioletred" class="card">
          <div class="card-content">
            <div class="content">
              <b-row>
                <b-col md="10">
                  <h1>Total Staff</h1>
                </b-col>
                <b-col md="2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
                    <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
                  </svg>
                </b-col>
                <div style="text-align: center;font-size: 400%; margin-top: -5%">76</div>
              </b-row>


            </div>
          </div>
        </div>
      </b-col>
      <b-col style="width: 35%;" class="mt-4" md="6">
        <div style="background-color: chocolate" class="card">
          <div class="card-content">
            <div class="content">
              <b-row>
                <b-col md="10">
                  <h1>Total Staff</h1>
                </b-col>
                <b-col md="2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
                    <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
                  </svg>
                </b-col>
                <div style="text-align: center;font-size: 400%; margin-top: -5%">76</div>
              </b-row>


            </div>
          </div>
        </div>
      </b-col>
      <b-col style="width: 35%; margin-left: 5%" class="mt-4" md="6">
        <div  style="background-color: lemonchiffon" class="card">
          <div class="card-content">
            <div class="content">
              <b-row>
                <b-col md="10">
                  <h1>Total Staff</h1>
                </b-col>
                <b-col md="2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
                    <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
                  </svg>
                </b-col>
                <div style="text-align: center;font-size: 400%; margin-top: -5%">76</div>
              </b-row>


            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "admin_home",
  data(){
    return{
      total_staff:0,
      total_shipping:0,

    }
  }
}
</script>

<style scoped>

</style>
