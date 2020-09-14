<template>
  <nav
    class="navbar navbar-dark px-3 bg-dark navbar-expand-md  justify-content-center"
  >
    <router-link to="/" class="navbar-brand d-flex w-50 mr-auto">
      መንግሥተ መጽሐፍት</router-link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#collapsingNavbar3"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-collapse collapse w-100" id="collapsingNavbar3">
      <ul class="navbar-nav w-100 justify-content-center">
        <li class="nav-item">
          <router-link class="nav-link" to="/about">
            About Us
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">
            Contact
          </router-link>
        </li>
      </ul>
      <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
        <li class="nav-item">
          <router-link class="nav-link btn bg-info" to="/about">
            Upload Book
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  components: {}
};
</script>

<style>
.container {
  margin: 10px auto;
}
.navbar {
  color: black;
  font-family: "Times New Roman", Times, serif;
}
.navbar a {
  text-decoration: none;
  color: black;
}
</style>
