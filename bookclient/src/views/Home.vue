<template>
  <div class="row">
    <div class="p-5 col-md-8">
      <router-view :key="$route.path" />
    </div>
    <div class="col-md-4 p-2">
      <ul class="nav  ">
        <li class="nav-item">
          <router-link
            class="nav-link active"
            :to="'/genre/' + g._id"
            v-for="g in genres"
            :key="g._id"
          >
            {{ g.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useGenreHelper } from "../../helpers/helpermethods.js";
export default {
  name: "Home",
  setup() {
    const { genres } = useGenreHelper();
    return { genres };
  }
};
</script>
